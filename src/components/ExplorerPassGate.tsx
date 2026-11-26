import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Ticket } from 'lucide-react';
import { QuizOutcome } from '../data/imagineCityData';
import { CharacterPortrait } from './CharacterPortrait';

export interface ExplorerPassData {
  submitted: boolean;
  nickname: string;
  gradeLevel: string;
  studyPlan: string;
  province: string;
  discoveryChannel: string;
  decisionFactors: string[];
  decisionStage: string;
  creativeExperience: string;
  contactChannel: 'LINE' | 'อีเมล' | 'Facebook' | 'Instagram' | 'เบอร์โทรศัพท์';
  contactValue: string;
}

interface ExplorerPassGateProps {
  outcome: QuizOutcome;
  onCompletePass: (data: ExplorerPassData) => void;
}

const GRADE_OPTIONS = ['ม.4', 'ม.5', 'ม.6', 'ปวช.', 'ปวส.', 'อื่น ๆ / บุคคลทั่วไป'];
const FACTOR_OPTIONS = [
  'ทุนการศึกษาและค่าเล่าเรียน',
  'อาชีพหลังเรียนจบที่ชัดเจน',
  'ผลงานรุ่นพี่และชื่อเสียงคณะ',
  'อุปกรณ์ สตูดิโอ และซอฟต์แวร์ทันสมัย',
  'โอกาสฝึกงานและร่วมงานกับบริษัทจริง',
  'บรรยากาศการเรียนและสังคมสร้างสรรค์',
];
const CHANNEL_OPTIONS = [
  'TikTok / Reels',
  'Instagram',
  'Facebook',
  'แนะแนวที่โรงเรียน / Open House',
  'เพื่อน / รุ่นพี่แนะนำ',
  'ค้นหาจาก Google / YouTube',
];
const STAGE_OPTIONS = [
  'กำลังเริ่มสำรวจความชอบของตัวเอง',
  'มีคณะในใจแล้ว กำลังเปรียบเทียบสาขา',
  'ตัดสินใจเลือกสายนี้แล้ว รอเตรียมพอร์ตโฟลิโอ',
  'พร้อมสมัครเข้าศึกษาต่อเร็ว ๆ นี้',
];
const EXPERIENCE_OPTIONS = [
  'ยังไม่เคยทำผลงานจริง แต่อยากเริ่มต้นเรียนรู้',
  'ฝึกวาด ตัดต่อ หรือทำเกมเป็นงานอดิเรก',
  'เคยประกวดหรือรับงานฟรีแลนซ์เบื้องต้น',
  'มีพอร์ตโฟลิโอและผลงานพร้อมนำเสนอแล้ว',
];

export const ExplorerPassGate: React.FC<ExplorerPassGateProps> = ({
  outcome,
  onCompletePass,
}) => {
  const [nickname, setNickname] = useState('');
  const [gradeLevel, setGradeLevel] = useState('ม.5');
  const [studyPlan, setStudyPlan] = useState('');
  const [province, setProvince] = useState('');
  const [discoveryChannel, setDiscoveryChannel] = useState(CHANNEL_OPTIONS[0]);
  const [decisionFactors, setDecisionFactors] = useState<string[]>([
    'อาชีพหลังเรียนจบที่ชัดเจน',
  ]);
  const [decisionStage, setDecisionStage] = useState(STAGE_OPTIONS[0]);
  const [creativeExperience, setCreativeExperience] = useState(EXPERIENCE_OPTIONS[1]);
  const [contactChannel, setContactChannel] =
    useState<ExplorerPassData['contactChannel']>('LINE');
  const [contactValue, setContactValue] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleFactor = (factor: string) => {
    setErrorMsg(null);
    if (decisionFactors.includes(factor)) {
      setDecisionFactors((prev) => prev.filter((item) => item !== factor));
      return;
    }
    if (decisionFactors.length >= 2) {
      setDecisionFactors((prev) => [prev[1], factor]);
      return;
    }
    setDecisionFactors((prev) => [...prev, factor]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (contactValue.trim()) {
      if (
        contactChannel === 'อีเมล' &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue.trim())
      ) {
        setErrorMsg('กรุณากรอกรูปแบบอีเมลให้ถูกต้อง (เช่น name@example.com)');
        return;
      }
      if (
        contactChannel === 'เบอร์โทรศัพท์' &&
        !/^[0-9+\-\s]{9,15}$/.test(contactValue.trim())
      ) {
        setErrorMsg('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (9–15 หลัก)');
        return;
      }
    }

    onCompletePass({
      submitted: true,
      nickname: nickname.trim() || 'นักเดินทางแห่งแสงสี',
      gradeLevel,
      studyPlan: studyPlan.trim() || 'ไม่ได้ระบุ',
      province: province.trim() || 'ไม่ได้ระบุ',
      discoveryChannel,
      decisionFactors,
      decisionStage,
      creativeExperience,
      contactChannel,
      contactValue: contactValue.trim(),
    });
  };

  const handleSkip = () => {
    onCompletePass({
      submitted: false,
      nickname: nickname.trim() || 'นักเดินทางแห่งแสงสี',
      gradeLevel,
      studyPlan: '',
      province: '',
      discoveryChannel: '',
      decisionFactors: [],
      decisionStage: '',
      creativeExperience: '',
      contactChannel: 'LINE',
      contactValue: '',
    });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="rounded-2xl bg-[#162033] border border-amber-400/30 overflow-hidden shadow-xl">
        {/* Top Festival Ticket Banner */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] border-b border-amber-400/20 px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-[#EC4899]/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-amber-300 tracking-wide">
                ประตูสุดท้าย · บัตรผ่านนักเดินทาง & สิทธิพิเศษจาก SDM
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                ออกบัตร Explorer Pass เพื่อรับผลลัพธ์และข้อมูลทุนการศึกษา
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <CharacterPortrait
              character={outcome.primaryTrack.character}
              accentHex={outcome.primaryTrack.accentHex}
              variant="compact"
            />
            <div className="text-xs text-slate-300">
              <div>{outcome.primaryTrack.character.name.split(' ')[0]} พร้อมแล้ว!</div>
              <div className="text-slate-400">กรอกเท่าที่สะดวก หรือกดข้ามได้</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* Group 1: ข้อมูลพื้นฐานผู้เรียน */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">
              01. ข้อมูลพื้นฐานผู้เรียน (Optional)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="exp-nickname"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  ชื่อเล่น (แสดงบนบัตรผลลัพธ์)
                </label>
                <input
                  id="exp-nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="เช่น มินนี่, ต้นกล้า"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F172A] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label
                  htmlFor="exp-grade"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  ระดับชั้นปัจจุบัน
                </label>
                <select
                  id="exp-grade"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F172A] border border-white/15 text-sm text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  {GRADE_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="exp-plan"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  แผนการเรียน / สาขาวิชา
                </label>
                <input
                  id="exp-plan"
                  type="text"
                  value={studyPlan}
                  onChange={(e) => setStudyPlan(e.target.value)}
                  placeholder="เช่น วิทย์-คณิต, ศิลป์คำนวณ, คอมพิวเตอร์กราฟิก"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F172A] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label
                  htmlFor="exp-province"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  จังหวัดที่อยู่อาศัย
                </label>
                <input
                  id="exp-province"
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="เช่น กรุงเทพฯ, เชียงใหม่"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F172A] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
            </div>
          </div>

          {/* Group 2: ข้อมูลเชิงลึกเพื่อการแนะแนว (Insight) */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-base font-semibold text-white">
              02. ข้อมูลเชิงลึกเพื่อการแนะแนว (Insight)
            </h3>

            <div>
              <div className="text-xs font-medium text-slate-300 mb-2">
                ปัจจัยหลักในการเลือกคณะ (เลือกได้สูงสุด 2 ข้อ)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {FACTOR_OPTIONS.map((factor) => {
                  const active = decisionFactors.includes(factor);
                  return (
                    <button
                      key={factor}
                      type="button"
                      onClick={() => toggleFactor(factor)}
                      className={`text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition-colors flex items-center gap-2.5 cursor-pointer ${
                        active
                          ? 'bg-[#EC4899]/15 border-[#EC4899] text-white'
                          : 'bg-[#0F172A] border-white/10 text-slate-300 hover:border-white/25'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          active ? 'text-[#EC4899]' : 'text-slate-600'
                        }`}
                      />
                      <span>{factor}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label
                  htmlFor="exp-channel"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  ช่องทางที่รู้จักคณะ SDM
                </label>
                <select
                  id="exp-channel"
                  value={discoveryChannel}
                  onChange={(e) => setDiscoveryChannel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F172A] border border-white/15 text-sm text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  {CHANNEL_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="exp-stage"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  ขั้นตอนการตัดสินใจตอนนี้
                </label>
                <select
                  id="exp-stage"
                  value={decisionStage}
                  onChange={(e) => setDecisionStage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F172A] border border-white/15 text-sm text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  {STAGE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="exp-exp"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  ประสบการณ์ด้านงานสร้างสรรค์
                </label>
                <select
                  id="exp-exp"
                  value={creativeExperience}
                  onChange={(e) => setCreativeExperience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F172A] border border-white/15 text-sm text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  {EXPERIENCE_OPTIONS.map((ex) => (
                    <option key={ex} value={ex}>
                      {ex}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Group 3: ช่องทางติดต่อกลับ */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-base font-semibold text-white">
              03. ช่องทางรับข่าวสารกิจกรรม Open House และทุนการศึกษาของ SDM
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4">
                <label
                  htmlFor="exp-contact-type"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  ช่องทางติดต่อกลับ
                </label>
                <select
                  id="exp-contact-type"
                  value={contactChannel}
                  onChange={(e) =>
                    setContactChannel(
                      e.target.value as ExplorerPassData['contactChannel']
                    )
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F172A] border border-white/15 text-sm text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  <option value="LINE">LINE ID</option>
                  <option value="อีเมล">อีเมล</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="เบอร์โทรศัพท์">เบอร์โทรศัพท์</option>
                </select>
              </div>

              <div className="sm:col-span-8">
                <label
                  htmlFor="exp-contact-value"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  ไอดี / อีเมล / เบอร์ติดต่อ (เลือกกรอกตามสะดวก)
                </label>
                <input
                  id="exp-contact-value"
                  type="text"
                  value={contactValue}
                  onChange={(e) => {
                    setContactValue(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder={`กรอก ${contactChannel} ของคุณ`}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F172A] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-rose-500/15 border border-rose-400/40 text-xs sm:text-sm text-rose-200"
              >
                {errorMsg}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleSkip}
              className="px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 border border-white/10 transition-colors cursor-pointer"
            >
              ข้ามขั้นตอนนี้เพื่อดูผลลัพธ์ทันที
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-95 text-white text-sm sm:text-base font-semibold transition-opacity cursor-pointer"
            >
              <span>
                สมัครสมาชิก เพื่อรับข่าวกิจกรรมของ SDM และข้อมูลทุนการศึกษาก่อนใคร
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
