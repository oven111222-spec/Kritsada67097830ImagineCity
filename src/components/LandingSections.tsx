import React, { useState } from 'react';
import { ArrowRight, BookOpen, Compass, Flame, MapPin, Sparkles } from 'lucide-react';
import { TRACK_ORDER, TRACKS, TrackId } from '../data/imagineCityData';
import { CharacterPortrait } from './CharacterPortrait';
import { CityscapeBackdrop } from './CityscapeBackdrop';
import { IsometricDistrictMap } from './IsometricDistrictMap';
import { assetPath } from '../utils/assets';

interface LandingSectionsProps {
  onStartQuiz: (preferredCompanion?: TrackId) => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({
  onStartQuiz,
}) => {
  const [selectedCompanion, setSelectedCompanion] = useState<TrackId>('DGA');
  const [activeDistrictTab, setActiveDistrictTab] = useState<TrackId>('DGA');
  const [heroLightPercent, setHeroLightPercent] = useState<number>(54);

  const companionTrack = TRACKS[selectedCompanion];
  const districtTrack = TRACKS[activeDistrictTab];

  return (
    <main id="top" className="relative">
      {/* HERO SECTION */}
      <section
        id="story"
        className="relative overflow-hidden border-b border-white/10 pt-10 pb-0 sm:pt-16"
      >
        {/* Subtle atmospheric top gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[360px] rounded-full bg-gradient-to-r from-[#EC4899]/15 via-[#8B5CF6]/15 to-[#38BDF8]/15 blur-3xl"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy & Official Logo Lockup */}
            <div className="lg:col-span-6 space-y-5">
              <h1 className="sr-only">
                Imagine City: คืนสุดท้ายก่อนสีจะหายไป · School of Digital Media (SDM)
              </h1>

              <div className="relative max-w-lg -ml-2 sm:-ml-3">
                <img
                  src={assetPath('assets/aistudio/1795186101507_24a9f1d0.jpg')}
                  alt="Imagine City: คืนสุดท้ายก่อนสีจะหายไป - Interactive Story Quiz @ School of Digital Media (SDM)"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/10] object-cover object-[50%_46%] rounded-2xl"
                  style={{
                    WebkitMaskImage:
                      'radial-gradient(ellipse 90% 85% at 50% 48%, #000 58%, transparent 100%)',
                    maskImage:
                      'radial-gradient(ellipse 90% 85% at 50% 48%, #000 58%, transparent 100%)',
                  }}
                />
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                “คืนนี้สีสันของ Imagine City กำลังจะหายไปตลอดกาล...
                มีเพียงเธอคนเดียวที่กู้เมืองนี้กลับมาได้ หากก้าวขึ้นเวทีในเทศกาล
                Imagine Design Event และทำให้ผู้คนกลับมายิ้มได้อีกครั้ง”
              </p>

              <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
                โจทย์ควิซเชิงโต้ตอบ 11 ฉาก (Interactive Story Quiz) เพื่อค้นหาตัวตน
                เส้นทางอาชีพ และสาขาที่ใช่ ณ School of Digital Media พร้อมเพื่อนร่วมทางทั้ง 5
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => onStartQuiz()}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#EC4899] hover:bg-[#DB2777] text-white font-semibold text-sm sm:text-base transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
                >
                  <span>เริ่มออกเดินทางเพื่อค้นหาตัวตนของคุณ</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <a
                  href="#companions"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white bg-slate-800/70 hover:bg-slate-800 border border-white/10 transition-colors whitespace-nowrap"
                >
                  พบกับเพื่อนร่วมทางทั้ง 5
                </a>
              </div>

              {/* Clean unboxed metadata row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 pt-2">
                <span>11 ฉากการผจญภัย</span>
                <span aria-hidden="true">·</span>
                <span>5 สาขาแห่ง SDM</span>
                <span aria-hidden="true">·</span>
                <span>รองรับผลลัพธ์สายเดี่ยวและสายผสม (Hybrid)</span>
              </div>
            </div>

            {/* Right Visual: All 5 Uploaded Characters + Guiding Light Stage */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-[#162033]/90 border border-white/10 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      เพื่อนร่วมทางประจำ 5 ย่านแห่ง Imagine City
                    </div>
                    <div className="text-xs text-slate-400">
                      คลิกที่ตัวละครเพื่อส่องแสงปลุกสีสันและดูข้อมูลผู้นำทาง
                    </div>
                  </div>
                  <span className="font-mono-num text-xs text-[#38BDF8]">
                    {heroLightPercent}% LIGHT
                  </span>
                </div>

                {/* 5-Character Ensemble Grid */}
                <div className="grid grid-cols-5 gap-2 sm:gap-3 items-end">
                  {TRACK_ORDER.map((id) => {
                    const t = TRACKS[id];
                    const isFocused = selectedCompanion === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setSelectedCompanion(id);
                          setHeroLightPercent(
                            id === 'DGA'
                              ? 38
                              : id === 'DGD'
                                ? 54
                                : id === 'IGD'
                                  ? 70
                                  : id === 'AFX'
                                    ? 85
                                    : 100
                          );
                        }}
                        className={`group flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl border transition-transform duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8] ${
                          isFocused
                            ? 'bg-slate-800 border-white/30 -translate-y-1'
                            : 'bg-slate-900/50 border-white/5 hover:border-white/20 hover:-translate-y-0.5'
                        }`}
                      >
                        <CharacterPortrait
                          character={t.character}
                          accentHex={t.accentHex}
                          variant="card"
                          className="w-full aspect-[3/4]"
                        />
                        <span className="mt-2 text-[11px] sm:text-xs font-semibold text-white truncate max-w-full">
                          {t.character.name.split(' ')[0]}
                        </span>
                        <span
                          className="font-mono-num text-[10px] font-medium"
                          style={{ color: t.accentHex }}
                        >
                          {t.code}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Character Quick Quote Strip */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-300">
                      {companionTrack.character.name} ·{' '}
                      <span className="text-slate-400">
                        {companionTrack.districtName}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 mt-0.5 line-clamp-2">
                      {companionTrack.character.signatureQuote}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onStartQuiz(selectedCompanion)}
                    className="shrink-0 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-white/15 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    ออกเดินทางด้วยกัน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Split Monochrome-to-Color Cityscape Footer of Hero */}
        <div className="mt-10 sm:mt-14 relative">
          <CityscapeBackdrop
            restorationPercent={heroLightPercent}
            className="h-36 sm:h-48"
          />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-4 flex items-center justify-between text-xs text-slate-400">
            <span>ฝั่งไร้สี (Monochrome Night)</span>
            <span>ดวงไฟนำทางกลางจัตุรัส · คลิกตัวละครด้านบนเพื่อทดสอบแสงสี</span>
            <span className="text-[#38BDF8]">ฝั่งสีสันนีออนพาสเทล (Awakened)</span>
          </div>
        </div>
      </section>

      {/* SECTION 01: CHARACTER COMPANIONS */}
      <section id="companions" className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-semibold text-[#EC4899] tracking-wide mb-2">
              01. ตัวประกอบร่วมเดินทางทั้ง 5 แห่ง Imagine City
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              พบกับ 5 เพื่อนร่วมทางที่จะคอยเคียงข้างเธอตลอด 11 ฉาก
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              แต่ละคนคือตัวแทนของพลังสร้างสรรค์ทั้ง 5 ย่านใน School of Digital Media
              คอยให้คำแนะนำ สะท้อนตัวตนจากการตัดสินใจของคุณ และร่วมขึ้นเวทีคืนเทศกาลไปด้วยกัน
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Character Selector List */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {TRACK_ORDER.map((id) => {
                const t = TRACKS[id];
                const isSelected = selectedCompanion === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedCompanion(id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors flex items-center gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8] ${
                      isSelected
                        ? 'bg-[#1E293B] border-white/25'
                        : 'bg-[#162033]/60 border-white/10 hover:bg-[#162033] hover:border-white/20'
                    }`}
                  >
                    <CharacterPortrait
                      character={t.character}
                      accentHex={t.accentHex}
                      variant="compact"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm sm:text-base font-semibold text-white truncate">
                          {t.character.name}
                        </span>
                        <span
                          className="font-mono-num text-xs font-semibold shrink-0"
                          style={{ color: t.accentHex }}
                        >
                          {t.code}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">
                        {t.character.roleTitle} · {t.majorName}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Character Detail Card */}
            <div className="lg:col-span-7 rounded-2xl bg-[#162033] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
              <div className="w-48 sm:w-56 shrink-0 flex flex-col">
                <CharacterPortrait
                  character={companionTrack.character}
                  accentHex={companionTrack.accentHex}
                  variant="card"
                  className="w-full h-64 sm:h-full min-h-[260px]"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="text-xs font-mono-num text-slate-400">
                    {companionTrack.character.englishName}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {companionTrack.character.name}
                  </h3>
                  <div
                    className="text-sm font-medium"
                    style={{ color: companionTrack.accentHex }}
                  >
                    {companionTrack.districtName} · {companionTrack.majorName}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {companionTrack.character.personality}
                  </p>

                  <div className="pt-2 border-t border-white/10">
                    <div className="text-xs text-slate-400 mb-1">
                      ของติดตัวประจำย่าน
                    </div>
                    <div className="text-sm font-medium text-white">
                      {companionTrack.character.itemName}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0F172A]/80 border border-white/10 text-sm text-slate-200 leading-relaxed">
                    {companionTrack.character.signatureQuote}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onStartQuiz(companionTrack.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors cursor-pointer whitespace-nowrap"
                    style={{ backgroundColor: companionTrack.accentHex }}
                  >
                    <span>เริ่มผจญภัยพร้อม {companionTrack.character.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: GAMEPLAY RULES */}
      <section id="rules" className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-semibold text-[#38BDF8] tracking-wide mb-2">
              02. กติกาและวิธีเล่น
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              ไม่มีคำตอบที่ผิด มีแต่ “ใช่” สำหรับเธอ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#162033] border border-white/10 p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#EC4899]/15 border border-[#EC4899]/30 flex items-center justify-center text-[#EC4899]">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                01. เลือกข้อที่ใกล้ใจที่สุดในตอนนี้
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                ไม่ต้องคิดนานหรือกังวลเรื่องความถูกต้อง ข้อที่ดึงดูดสายตาหรือตรงกับสัญชาตญาณแรกมักสะท้อนตัวตนที่แท้จริงได้ดีที่สุด
              </p>
            </div>

            <div className="rounded-xl bg-[#162033] border border-white/10 p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                02. สะสมคะแนนผ่าน 11 ฉากสำคัญ
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                ทุกการตัดสินใจในแต่ละบท (คะแนนเต็ม <span className="font-mono-num">11</span> คะแนน)
                จะบันทึกเข้าสู่ 5 สายความถนัดโดยอัตโนมัติ (DGA, DGD, IGD, AFX, DEN)
              </p>
            </div>

            <div className="rounded-xl bg-[#162033] border border-white/10 p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                03. รองรับทั้งสายเดี่ยวและสายผสม (Hybrid)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                หากคะแนนสูงสุดนำเดี่ยวจะแสดงตัวตนหลัก แต่หากมี 2 สาขาที่คะแนนห่างกันไม่เกิน{' '}
                <span className="font-mono-num">1</span> คะแนน ระบบจะผสานจุดเด่นทั้งสองสายและเปิด 2 ย่านให้สำรวจในบทที่ 3
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: 5 DISTRICTS & SDM MAJORS */}
      <section id="districts" className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold text-[#8B5CF6] tracking-wide mb-2">
                03. สำรวจ 5 ย่านสร้างสรรค์และสาขาที่เปิดสอน
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                5 ย่านแห่ง Imagine City · School of Digital Media
              </h2>
            </div>

            {/* Interactive District Segmented Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#162033] border border-white/10 rounded-xl">
              {TRACK_ORDER.map((id) => {
                const isActive = activeDistrictTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveDistrictTab(id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono-num transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-white text-[#0F172A]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {id}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Isometric Map */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <IsometricDistrictMap
                activeTracks={[activeDistrictTab]}
                onSelectTrack={(id) => setActiveDistrictTab(id)}
              />
              <div className="rounded-xl bg-[#162033] border border-white/10 p-4 flex items-center gap-4">
                <CharacterPortrait
                  character={districtTrack.character}
                  accentHex={districtTrack.accentHex}
                  variant="compact"
                />
                <div className="min-w-0">
                  <div className="text-xs text-slate-400">ผู้นำทางประจำย่าน</div>
                  <div className="text-sm font-semibold text-white truncate">
                    {districtTrack.character.name}
                  </div>
                  <div className="text-xs text-slate-300 truncate">
                    {districtTrack.character.roleTitle}
                  </div>
                </div>
              </div>
            </div>

            {/* District Detail Panel */}
            <div className="lg:col-span-7 rounded-2xl bg-[#162033] border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <MapPin className="w-3.5 h-3.5" style={{ color: districtTrack.accentHex }} />
                  <span>{districtTrack.districtName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">{districtTrack.code}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {districtTrack.majorName}
                  </h3>
                  <div className="text-sm text-slate-400 mt-0.5">
                    {districtTrack.majorThai} · ฉายา “{districtTrack.personaTitle}”
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {districtTrack.summary}
                </p>

                <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-2.5">
                      บทบาทและโจทย์ท้าทายในย่าน
                    </div>
                    <ul className="space-y-2 text-sm text-slate-200">
                      {districtTrack.districtTasks.map((task, idx) => (
                        <li key={task} className="flex items-start gap-2">
                          <span
                            className="font-mono-num text-xs mt-0.5 shrink-0"
                            style={{ color: districtTrack.accentHex }}
                          >
                            0{idx + 1}.
                          </span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-2.5">
                      ตัวอย่างอาชีพที่เกี่ยวข้อง (10 อาชีพ)
                    </div>
                    <ul className="space-y-1.5 text-sm text-slate-300">
                      {districtTrack.careers.slice(0, 6).map((career, idx) => (
                        <li key={career} className="flex items-center gap-2">
                          <span className="font-mono-num text-xs text-slate-500">
                            0{idx + 1}
                          </span>
                          <span>{career}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-xs text-slate-400 mt-2">
                      + อีก 4 เส้นทางอาชีพเฉพาะทางในผลลัพธ์ควิซ
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  อยากรู้ว่าย่านนี้ใช่สำหรับเธอหรือไม่?
                </div>
                <button
                  type="button"
                  onClick={() => onStartQuiz()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#EC4899] hover:bg-[#DB2777] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>เริ่มทำควิซ 11 ฉาก</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-[#0B1120]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <img
              src={assetPath('assets/aistudio/1795186101507_24a9f1d0.jpg')}
              alt="Imagine City Logo"
              referrerPolicy="no-referrer"
              className="h-8 w-11 rounded object-cover object-[50%_38%] border border-white/10 shrink-0"
            />
            <span>
              Imagine City: คืนสุดท้ายก่อนสีจะหายไป · School of Digital Media (SDM)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#story" className="hover:text-white transition-colors">
              เรื่องราว
            </a>
            <a href="#companions" className="hover:text-white transition-colors">
              เพื่อนร่วมทาง
            </a>
            <a href="#districts" className="hover:text-white transition-colors">
              สาขา SDM
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};
