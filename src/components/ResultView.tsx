import React, { useMemo, useState } from 'react';
import {
  Check,
  Copy,
  Download,
  RotateCcw,
  Sparkles,
  Ticket,
} from 'lucide-react';
import { QuizOutcome, TRACK_ORDER, TRACKS } from '../data/imagineCityData';
import { generateShareCardPng } from '../utils/shareCardCanvas';
import { CharacterPortrait } from './CharacterPortrait';
import { CityscapeBackdrop } from './CityscapeBackdrop';
import { ExplorerPassData } from './ExplorerPassGate';
import { assetPath } from '../utils/assets';

interface ResultViewProps {
  outcome: QuizOutcome;
  passData: ExplorerPassData;
  onRestart: () => void;
  onGoHome: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  outcome,
  passData,
  onRestart,
  onGoHome,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const explorerId = useMemo(() => {
    const code = outcome.primaryTrack.code;
    const sum = Object.values(outcome.scores).reduce((a, b) => a + b, 0);
    return `SDM-${code}-${String(sum).padStart(2, '0')}26`;
  }, [outcome]);

  const maxScore = Math.max(1, ...Object.values(outcome.scores));

  const handleDownloadCard = async () => {
    setIsExporting(true);
    try {
      const dataUrl = await generateShareCardPng(outcome, passData.nickname);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `ImagineCity-${outcome.primaryTrack.code}-${explorerId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyShareText = async () => {
    const title = outcome.hybridTitle || outcome.primaryTrack.personaTitle;
    const text = `ฉันกู้คืนสีสันให้ Imagine City สำเร็จแล้ว! ฉายาของฉันคือ "${title}" · สาขา ${outcome.primaryTrack.majorName} (${outcome.primaryTrack.code}) ณ School of Digital Media (SDM)`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* HERO RESULT BANNER */}
      <div className="rounded-2xl bg-[#162033] border border-white/15 overflow-hidden">
        <div className="relative bg-[#0B1120] border-b border-white/10 pt-8 px-6 sm:px-10">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-6">
            {/* Persona Copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <img
                  src={assetPath('assets/aistudio/1795186101507_24a9f1d0.jpg')}
                  alt="Imagine City Logo"
                  referrerPolicy="no-referrer"
                  className="h-10 w-14 rounded-lg object-cover object-[50%_40%] border border-white/15 shrink-0"
                />
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#38BDF8]">
                  <span>Imagine Design Event · ผลลัพธ์ตัวตนของคุณ</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">
                    {outcome.isHybrid ? 'HYBRID PROFILE' : 'CORE PROFILE'}
                  </span>
                </div>
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                {outcome.isHybrid && outcome.hybridTitle
                  ? outcome.hybridTitle
                  : outcome.primaryTrack.personaTitle}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {outcome.primaryTrack.personaSubtitle}
              </p>

              <div className="pt-2 space-y-1">
                <div className="text-xs text-slate-400">สาขาวิชาที่แนะนำ ณ SDM</div>
                <div
                  className="text-xl font-bold"
                  style={{ color: outcome.primaryTrack.accentHex }}
                >
                  {outcome.primaryTrack.majorName} ({outcome.primaryTrack.majorThai})
                </div>
                {outcome.isHybrid && outcome.secondaryTrack && (
                  <div className="text-sm text-slate-300">
                    ผสานจุดเด่นร่วมกับสาขา{' '}
                    <span className="font-semibold text-white">
                      {outcome.secondaryTrack.majorName}
                    </span>{' '}
                    ({outcome.secondaryTrack.code})
                  </div>
                )}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                {outcome.primaryTrack.summary}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleDownloadCard}
                  disabled={isExporting}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#EC4899] hover:bg-[#DB2777] disabled:opacity-60 text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isExporting
                      ? 'กำลังสร้างภาพการ์ด...'
                      : 'บันทึกการ์ดผลลัพธ์ (IG Story / TikTok)'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyShareText}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/15 text-slate-200 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>คัดลอกแล้ว</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>คัดลอกข้อความแชร์</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Matched Companion(s) Celebration Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                className={`grid gap-4 w-full ${
                  outcome.isHybrid && outcome.secondaryTrack
                    ? 'grid-cols-2'
                    : 'grid-cols-1 max-w-[260px]'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <CharacterPortrait
                    character={outcome.primaryTrack.character}
                    accentHex={outcome.primaryTrack.accentHex}
                    variant="card"
                    className="w-full aspect-[3/4]"
                  />
                  <div className="mt-2.5 text-sm font-semibold text-white">
                    {outcome.primaryTrack.character.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    ผู้นำทางหลัก · {outcome.primaryTrack.code}
                  </div>
                </div>

                {outcome.isHybrid && outcome.secondaryTrack && (
                  <div className="flex flex-col items-center text-center">
                    <CharacterPortrait
                      character={outcome.secondaryTrack.character}
                      accentHex={outcome.secondaryTrack.accentHex}
                      variant="card"
                      className="w-full aspect-[3/4]"
                    />
                    <div className="mt-2.5 text-sm font-semibold text-white">
                      {outcome.secondaryTrack.character.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      คู่ผสานพลัง · {outcome.secondaryTrack.code}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <CityscapeBackdrop restorationPercent={100} className="h-24 sm:h-28 -mx-6 sm:-mx-10" />
        </div>

        {/* Bottom Details Grid: Scores + Strengths + 10 Careers */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 5: Affinity Breakdown + Strengths */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-base font-semibold text-white mb-4">
                สัดส่วนพลังความถนัดทั้ง 5 ด้าน (11 ฉาก)
              </h2>
              <div className="space-y-3">
                {TRACK_ORDER.map((id) => {
                  const t = TRACKS[id];
                  const val = outcome.scores[id];
                  const pct = Math.round((val / Math.max(4, maxScore)) * 100);
                  const isTop =
                    id === outcome.primaryTrack.id ||
                    id === outcome.secondaryTrack?.id;
                  return (
                    <div key={id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={
                            isTop ? 'font-semibold text-white' : 'text-slate-400'
                          }
                        >
                          <span className="font-mono-num mr-1.5" style={{ color: t.accentHex }}>
                            {id}
                          </span>
                          {t.districtShort}
                        </span>
                        <span className="font-mono-num text-slate-200">
                          {val} / 11
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#0F172A] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.max(4, pct)}%`,
                            backgroundColor: t.accentHex,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-base font-semibold text-white mb-3">
                จุดเด่นเฉพาะตัวของคุณ
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {outcome.primaryTrack.strengths.map((s, idx) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <span
                      className="font-mono-num text-xs mt-0.5 shrink-0"
                      style={{ color: outcome.primaryTrack.accentHex }}
                    >
                      0{idx + 1}.
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
                {outcome.isHybrid && outcome.secondaryTrack && (
                  <li className="flex items-start gap-2.5 text-slate-200">
                    <Sparkles className="w-4 h-4 text-[#EC4899] shrink-0 mt-0.5" />
                    <span>
                      พลังสายผสม: {outcome.secondaryTrack.strengths[0]}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Right 7: 10 Recommended Careers + Explorer Pass */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-base font-semibold text-white">
                  10 เส้นทางอาชีพแนะนำ (เรียงตามความสนใจในบทที่ 3)
                </h2>
                <span className="font-mono-num text-xs text-slate-400">
                  {outcome.primaryTrack.majorName}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {outcome.orderedCareers.map((career, idx) => (
                  <div
                    key={career}
                    className={`px-3.5 py-2.5 rounded-lg border text-sm flex items-center gap-3 ${
                      idx === 0
                        ? 'bg-[#1E293B] border-white/30 text-white font-semibold'
                        : 'bg-[#0F172A]/80 border-white/10 text-slate-200'
                    }`}
                  >
                    <span
                      className="font-mono-num text-xs shrink-0"
                      style={{
                        color:
                          idx === 0 ? outcome.primaryTrack.accentHex : '#64748B',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate">{career}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explorer Pass Festival Ticket */}
            <div className="rounded-xl bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] border border-amber-400/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Ticket className="w-4 h-4" />
                  <span>EXPLORER PASS · บัตรผ่านนักเดินทาง</span>
                </div>
                <div className="text-lg font-bold text-white truncate">
                  {passData.nickname || 'นักเดินทางแห่งแสงสี'}
                </div>
                <div className="text-xs text-slate-300 space-y-0.5">
                  <div>
                    สาขาแนะนำ: {outcome.primaryTrack.majorName} ({outcome.primaryTrack.code})
                  </div>
                  <div>
                    รหัสบัตร:{' '}
                    <span className="font-mono-num text-amber-200">{explorerId}</span>
                    {passData.submitted && passData.gradeLevel
                      ? ` · ${passData.gradeLevel}`
                      : ''}
                  </div>
                  {passData.submitted && (
                    <div className="text-emerald-300 pt-1">
                      บันทึกข้อมูลสิทธิ์รับข่าวกิจกรรม SDM Open House และทุนการศึกษาเรียบร้อยแล้ว
                    </div>
                  )}
                </div>
              </div>

              {/* Clean SVG QR Visual */}
              <div className="bg-white p-2.5 rounded-lg shrink-0 flex flex-col items-center">
                <svg
                  viewBox="0 0 64 64"
                  className="w-20 h-20 text-[#0F172A]"
                  aria-label="QR Code บัตรผ่านนักเดินทาง SDM"
                >
                  <rect x="4" y="4" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="10" y="10" width="6" height="6" fill="currentColor" />
                  <rect x="42" y="4" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="48" y="10" width="6" height="6" fill="currentColor" />
                  <rect x="4" y="42" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="10" y="48" width="6" height="6" fill="currentColor" />
                  <rect x="28" y="6" width="4" height="4" fill="currentColor" />
                  <rect x="34" y="12" width="4" height="8" fill="currentColor" />
                  <rect x="26" y="26" width="12" height="12" fill="#EC4899" />
                  <rect x="6" y="28" width="6" height="4" fill="currentColor" />
                  <rect x="16" y="30" width="6" height="6" fill="currentColor" />
                  <rect x="44" y="28" width="8" height="4" fill="currentColor" />
                  <rect x="54" y="34" width="6" height="6" fill="currentColor" />
                  <rect x="28" y="44" width="6" height="6" fill="currentColor" />
                  <rect x="38" y="46" width="8" height="4" fill="currentColor" />
                  <rect x="46" y="54" width="14" height="6" fill="currentColor" />
                  <rect x="28" y="54" width="12" height="6" fill="currentColor" />
                </svg>
                <span className="font-mono-num text-[9px] font-bold text-[#0F172A] mt-1">
                  {explorerId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Restart Bar */}
        <div className="px-6 sm:px-10 py-5 bg-[#0B1120] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onGoHome}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            กลับสู่หน้าแรกของ Imagine City
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/15 text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ออกเดินทางใหม่อีกครั้ง</span>
          </button>
        </div>
      </div>
    </section>
  );
};
