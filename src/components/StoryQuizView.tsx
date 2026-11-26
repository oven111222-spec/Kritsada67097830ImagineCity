import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  buildDistrictScene31,
  calculateOutcome,
  getUnlockedDistrictsAfterCh2,
  QuizChoice,
  QuizOutcome,
  SCENES,
  StoryScene,
  TRACK_ORDER,
  TRACKS,
  TrackId,
} from '../data/imagineCityData';
import { soundFX } from '../utils/sound';
import { CharacterPortrait } from './CharacterPortrait';
import { CityscapeBackdrop } from './CityscapeBackdrop';
import { IsometricDistrictMap } from './IsometricDistrictMap';

interface StoryQuizViewProps {
  initialCompanion?: TrackId;
  onComplete: (outcome: QuizOutcome) => void;
  onExit: () => void;
}

interface AnswerRecord {
  sceneIndex: number;
  choice: QuizChoice;
}

const INITIAL_SCORES: Record<TrackId, number> = {
  DGA: 0,
  DGD: 0,
  IGD: 0,
  AFX: 0,
  DEN: 0,
};

export const StoryQuizView: React.FC<StoryQuizViewProps> = ({
  initialCompanion,
  onComplete,
  onExit,
}) => {
  const [stepIndex, setStepIndex] = useState<number>(0); // 0..10 (11 scenes)
  const [scores, setScores] = useState<Record<TrackId, number>>({ ...INITIAL_SCORES });
  const [history, setHistory] = useState<AnswerRecord[]>([]);
  const [unlockedDistricts, setUnlockedDistricts] = useState<TrackId[]>(['DGA']);
  const [showDistrictUnlockModal, setShowDistrictUnlockModal] = useState<boolean>(false);
  const [careerFocusKey, setCareerFocusKey] = useState<string | null>(null);
  const [tieBreakerTrack, setTieBreakerTrack] = useState<TrackId>('DGA');

  const [selectedChoice, setSelectedChoice] = useState<QuizChoice | null>(null);
  const [lastReaction, setLastReaction] = useState<string | null>(
    initialCompanion
      ? `${TRACKS[initialCompanion].character.name}: “ยินดีที่ได้ออกเดินทางไปด้วยกันนะ! มาปลุกสีสันให้ Imagine City คืนนี้กันเถอะ”`
      : null
  );
  const [soundOn, setSoundOn] = useState<boolean>(true);

  const advanceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    soundFX.enabled = soundOn;
  }, [soundOn]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  // Construct the 11-scene sequence dynamically inserting Scene 3.1 at index 5
  const currentScene: StoryScene = useMemo(() => {
    if (stepIndex < 5) {
      return SCENES[stepIndex]; // 1.1, 1.2, 2.1, 2.2, 2.3
    }
    if (stepIndex === 5) {
      return buildDistrictScene31(unlockedDistricts); // 3.1
    }
    return SCENES[stepIndex - 1]; // index 6..10 map to SCENES[5..9] (3.2, 4.1, 4.2, 5.1, 5.2)
  }, [stepIndex, unlockedDistricts]);

  // City color restoration rises smoothly from 12% to 100% across 11 scenes
  const restorationPercent = Math.round(((stepIndex + (selectedChoice ? 1 : 0)) / 11) * 88 + 12);

  const commitChoice = (choice: QuizChoice) => {
    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }

    const updatedScores: Record<TrackId, number> = {
      ...scores,
      [choice.track]: scores[choice.track] + 1,
    };
    const nextHistory = [...history, { sceneIndex: stepIndex, choice }];
    const nextCareerFocus = choice.careerFocusKey ?? careerFocusKey;
    const nextTieBreaker = currentScene.isTieBreaker ? choice.track : tieBreakerTrack;

    setScores(updatedScores);
    setHistory(nextHistory);
    if (choice.careerFocusKey) setCareerFocusKey(choice.careerFocusKey);
    if (currentScene.isTieBreaker) setTieBreakerTrack(choice.track);
    setLastReaction(choice.reactionQuote);
    setSelectedChoice(null);

    // After Scene 2.3 (stepIndex === 4), unlock 1 or 2 districts and show Isometric Map Transition!
    if (stepIndex === 4) {
      const unlocked = getUnlockedDistrictsAfterCh2(updatedScores);
      setUnlockedDistricts(unlocked);
      soundFX.playDistrictUnlock();
      setShowDistrictUnlockModal(true);
      return;
    }

    // After Scene 5.2 (stepIndex === 10), complete the 11-scene journey!
    if (stepIndex === 10) {
      soundFX.playFestivalReveal();
      const outcome = calculateOutcome(
        updatedScores,
        nextTieBreaker,
        nextCareerFocus,
        unlockedDistricts
      );
      onComplete(outcome);
      return;
    }

    setStepIndex((prev) => prev + 1);
  };

  const handleSelectChoice = (choice: QuizChoice) => {
    if (selectedChoice) {
      // Immediate skip if user clicks again while previewing reaction
      commitChoice(selectedChoice);
      return;
    }

    soundFX.playChoice();
    setSelectedChoice(choice);

    advanceTimerRef.current = window.setTimeout(() => {
      commitChoice(choice);
    }, 850);
  };

  const handleGoBack = () => {
    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    if (selectedChoice) {
      setSelectedChoice(null);
      return;
    }
    if (showDistrictUnlockModal) {
      setShowDistrictUnlockModal(false);
    }
    if (history.length === 0) {
      onExit();
      return;
    }

    const last = history[history.length - 1];
    const revertedScores = {
      ...scores,
      [last.choice.track]: Math.max(0, scores[last.choice.track] - 1),
    };
    setScores(revertedScores);
    setHistory((prev) => prev.slice(0, -1));
    setStepIndex(last.sceneIndex);
    setLastReaction(null);
  };

  const handleReset = () => {
    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current);
    }
    setStepIndex(0);
    setScores({ ...INITIAL_SCORES });
    setHistory([]);
    setUnlockedDistricts(['DGA']);
    setShowDistrictUnlockModal(false);
    setCareerFocusKey(null);
    setSelectedChoice(null);
    setLastReaction(null);
  };

  // Keyboard shortcuts 1-5 for fast desktop answering
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (showDistrictUnlockModal) {
        if (e.key === 'Enter') {
          setShowDistrictUnlockModal(false);
          setStepIndex(5);
        }
        return;
      }
      const num = Number(e.key);
      if (num >= 1 && num <= currentScene.choices.length) {
        handleSelectChoice(currentScene.choices[num - 1]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  // DISTRICT UNLOCK TRANSITION SCREEN (After Scene 2.3)
  if (showDistrictUnlockModal) {
    const isDual = unlockedDistricts.length >= 2;
    return (
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="rounded-2xl bg-[#162033] border border-white/15 p-6 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="text-xs font-semibold text-[#38BDF8] mb-1">
                บทที่ 3 · ปลดล็อกแผนที่ย่านสร้างสรรค์
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {isDual
                  ? 'เข็มทิศเมืองเปิดเส้นทางพิเศษ 2 ย่านให้เธอสำรวจ!'
                  : `เข็มทิศเมืองนำทางเธอเข้าสู่ ${TRACKS[unlockedDistricts[0]].districtName}`}
              </h2>
              <p className="text-sm text-slate-300 mt-1.5">
                {isDual
                  ? 'คะแนนจาก 5 ฉากแรกของคุณสูสีกันใน 2 อันดับแรก ระบบจึงเปิดโอกาสให้สำรวจจุดเด่นของทั้ง 2 ย่านพร้อมกัน'
                  : 'พลังการตัดสินใจของคุณสอดคล้องกับย่านนี้อย่างชัดเจน ผู้นำทางประจำย่านกำลังรอต้อนรับอยู่'}
              </p>
            </div>
            <div className="shrink-0 font-mono-num text-xs text-slate-400">
              จบฉาก 2.3 / 11
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <IsometricDistrictMap activeTracks={unlockedDistricts} interactive={false} />
            </div>

            <div className="lg:col-span-6 space-y-4">
              {unlockedDistricts.map((id) => {
                const t = TRACKS[id];
                return (
                  <div
                    key={id}
                    className="rounded-xl bg-[#0F172A] border border-white/10 p-4 flex items-center gap-4"
                  >
                    <CharacterPortrait
                      character={t.character}
                      accentHex={t.accentHex}
                      variant="medallion"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="text-xs font-mono-num font-semibold"
                          style={{ color: t.accentHex }}
                        >
                          {t.code} · {t.majorName}
                        </span>
                        <span className="font-mono-num text-xs text-slate-400">
                          {scores[id]} คะแนน
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">
                        {t.districtName}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        ผู้นำทาง: {t.character.name} — {t.character.signatureQuote}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>ย้อนดูฉาก 2.3</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFX.playChoice();
                    setShowDistrictUnlockModal(false);
                    setStepIndex(5);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#EC4899] hover:bg-[#DB2777] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>ก้าวเข้าสู่บทที่ 3</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* QUIZ HUD BAR */}
      <div className="rounded-xl bg-[#162033] border border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{history.length === 0 ? 'หน้าหลัก' : 'ย้อนกลับ'}</span>
          </button>

          <div className="text-xs sm:text-sm font-medium text-slate-200">
            <span className="text-[#38BDF8]">{currentScene.chapterTitle}</span>
            <span className="mx-2 text-slate-500">·</span>
            <span className="font-mono-num text-slate-300">
              ฉาก {currentScene.code} ({stepIndex + 1}/11)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <Compass className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>สีสันเมือง:</span>
            <span className="font-mono-num font-semibold text-white">
              {restorationPercent}%
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSoundOn((prev) => !prev)}
            aria-label={soundOn ? 'ปิดเสียงเอฟเฟกต์' : 'เปิดเสียงเอฟเฟกต์'}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-white/10 transition-colors cursor-pointer"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleReset}
            aria-label="เริ่มควิซใหม่ตั้งแต่ฉากแรก"
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#38BDF8] transition-all duration-500 ease-out"
          style={{ width: `${((stepIndex + 1) / 11) * 100}%` }}
        />
      </div>

      {/* MAIN STORY STAGE */}
      <div className="rounded-2xl bg-[#162033] border border-white/10 overflow-hidden">
        {/* Visual Cityscape Header with Companion Cast */}
        <div className="relative bg-[#0B1120] border-b border-white/10 pt-5 px-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10 mb-4">
            <div className="text-xs font-mono-num text-slate-400">
              SCENE {currentScene.code} · {currentScene.stageMood.toUpperCase()} STAGE
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              {TRACK_ORDER.map((id) => (
                <span key={id} className="font-mono-num">
                  <span style={{ color: TRACKS[id].accentHex }}>{id}</span>:{scores[id]}
                </span>
              ))}
            </div>
          </div>

          {/* Character Companions Present in Current Scene */}
          <div className="relative z-10 flex items-end justify-center gap-2 sm:gap-5 pt-2 pb-4">
            {currentScene.featuredTracks.map((id) => {
              const t = TRACKS[id];
              const isHighlighted = selectedChoice?.track === id;
              return (
                <div
                  key={id}
                  className={`flex flex-col items-center transition-transform duration-200 ${
                    isHighlighted ? '-translate-y-2 scale-105' : ''
                  }`}
                >
                  <CharacterPortrait
                    character={t.character}
                    accentHex={t.accentHex}
                    variant={
                      currentScene.featuredTracks.length <= 2 ? 'medallion' : 'compact'
                    }
                  />
                  <span className="mt-1.5 text-[11px] font-medium text-slate-300">
                    {t.character.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <CityscapeBackdrop
            restorationPercent={restorationPercent}
            className="h-24 sm:h-28 -mx-4 sm:-mx-8"
          />
        </div>

        {/* Narrative & Choices Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Previous / Active Reaction Dialogue */}
          {(selectedChoice || lastReaction) && (
            <div className="rounded-xl bg-[#0F172A] border border-[#38BDF8]/30 px-4 py-3 text-xs sm:text-sm text-slate-200 flex items-center justify-between gap-3">
              <span>
                {selectedChoice ? selectedChoice.reactionQuote : lastReaction}
              </span>
              {selectedChoice && (
                <button
                  type="button"
                  onClick={() => commitChoice(selectedChoice)}
                  className="shrink-0 text-xs font-semibold text-[#38BDF8] hover:underline cursor-pointer whitespace-nowrap"
                >
                  ถัดไปทันที →
                </button>
              )}
            </div>
          )}

          <div className="space-y-3">
            <h2
              className="text-xl sm:text-2xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {currentScene.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentScene.narrative}
            </p>
            <div className="pt-2 text-sm sm:text-base font-semibold text-[#F472B6]">
              {currentScene.promptQuestion}
            </div>
          </div>

          {/* 5 Choices */}
          <div className="space-y-2.5">
            {currentScene.choices.map((choice, idx) => {
              const isSelected = selectedChoice?.id === choice.id;
              const t = TRACKS[choice.track];
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleSelectChoice(choice)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8] ${
                    isSelected
                      ? 'bg-[#1E293B] border-white/50 translate-x-1'
                      : 'bg-[#0F172A]/75 border-white/10 hover:bg-[#1E293B]/80 hover:border-white/25'
                  }`}
                >
                  <span
                    className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-mono-num text-xs font-bold mt-0.5 border"
                    style={{
                      borderColor: isSelected ? t.accentHex : 'rgba(255,255,255,0.15)',
                      backgroundColor: isSelected ? t.accentHex : 'rgba(15,23,42,0.8)',
                      color: '#FFFFFF',
                    }}
                  >
                    {isSelected ? <Check className="w-4 h-4" /> : idx + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm sm:text-base font-medium text-white leading-snug">
                      {choice.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {choice.detail}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
            <span>ไม่มีคำตอบที่ผิด เลือกข้อที่ตรงกับสัญชาตญาณแรกของคุณ</span>
            <span className="hidden sm:inline font-mono-num">
              กดปุ่มตัวเลข 1–{currentScene.choices.length} เพื่อเลือกได้ทันที
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
