import React from 'react';
import { assetPath } from '../utils/assets';

interface NavbarProps {
  onStartQuiz: () => void;
  onGoHome: () => void;
  isQuizActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartQuiz,
  onGoHome,
  isQuizActive,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F172A]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Wordmark with Logo Mark */}
        <a
          href="#top"
          onClick={(e) => {
            if (isQuizActive) {
              e.preventDefault();
              onGoHome();
            }
          }}
          className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-[#38BDF8] transition-colors"
        >
          <img
            src={assetPath('assets/aistudio/1795186101507_24a9f1d0.jpg')}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="h-9 w-12 rounded-md object-cover object-[50%_36%] border border-white/15 shrink-0"
          />
          <span>Imagine City</span>
        </a>

        {/* Zone 2: 4 Single-line Nav Links */}
        {!isQuizActive ? (
          <nav
            aria-label="เมนูหลัก"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
          >
            <a
              href="#story"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              เรื่องราว
            </a>
            <a
              href="#companions"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              เพื่อนร่วมทาง
            </a>
            <a
              href="#rules"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              กติกา
            </a>
            <a
              href="#districts"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              5 ย่านแห่ง SDM
            </a>
          </nav>
        ) : (
          <div className="hidden md:block text-sm text-slate-400 whitespace-nowrap shrink-0">
            School of Digital Media · Interactive Story Quiz
          </div>
        )}

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          {isQuizActive ? (
            <button
              type="button"
              onClick={onGoHome}
              className="px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
            >
              กลับหน้าแรก
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartQuiz}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#EC4899] hover:bg-[#DB2777] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
            >
              เริ่มค้นหาตัวตน
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
