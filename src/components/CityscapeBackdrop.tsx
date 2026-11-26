import React from 'react';

interface CityscapeBackdropProps {
  /** 0 = fully monochrome night, 50 = split screen (Hero concept), 100 = fully restored neon-pastel city */
  restorationPercent?: number;
  className?: string;
}

export const CityscapeBackdrop: React.FC<CityscapeBackdropProps> = ({
  restorationPercent = 54,
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, restorationPercent));
  // Left monochrome edge shrinks as restorationPercent rises
  const splitPercent = Math.max(0, 100 - clamped);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative w-full overflow-hidden select-none ${className}`}
    >
      {/* Monochrome Left Layer */}
      <svg
        viewBox="0 0 1440 360"
        fill="none"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full block"
      >
        <defs>
          <linearGradient id="skyMono" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect width="1440" height="360" fill="url(#skyMono)" />

        {/* Distant Monochrome Skyline */}
        <path
          d="M0 360V240H54V185H112V220H156V145H218V210H264V160H330V235H384V130H456V200H510V172H576V230H642V150H710V215H768V175H836V235H892V140H966V208H1024V165H1096V228H1164V152H1236V210H1292V178H1356V225H1410V190H1440V360H0Z"
          fill="#1E293B"
          stroke="#334155"
          strokeWidth="1"
        />

        {/* Foreground Monochrome Buildings */}
        <path
          d="M0 360V270H95V220H172V280H240V200H310V265H395V235H475V290H545V215H622V275H700V245H780V285H855V210H930V270H1015V240H1095V288H1175V220H1260V278H1345V248H1440V360H0Z"
          fill="#0F172A"
          stroke="#334155"
          strokeWidth="1.2"
        />

        {/* Subtle dim grey windows */}
        <g fill="#475569" opacity="0.45">
          <rect x="115" y="238" width="8" height="12" />
          <rect x="132" y="238" width="8" height="12" />
          <rect x="115" y="260" width="8" height="12" />
          <rect x="260" y="220" width="10" height="14" />
          <rect x="280" y="220" width="10" height="14" />
          <rect x="565" y="235" width="9" height="14" />
          <rect x="585" y="235" width="9" height="14" />
        </g>
      </svg>

      {/* Color-Awakened Layer clipped dynamically by restorationPercent */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          clipPath: `inset(0 0 0 ${splitPercent}%)`,
        }}
      >
        <svg
          viewBox="0 0 1440 360"
          fill="none"
          preserveAspectRatio="xMidYMax slice"
          className="w-full h-full block"
        >
          <defs>
            <radialGradient id="cityBeaconGlow" cx="50%" cy="68%" r="55%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#8B5CF6" stopOpacity="0.24" />
              <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="neonTower1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#312E81" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="neonTower2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4C1D95" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          <rect width="1440" height="360" fill="url(#cityBeaconGlow)" />

          {/* Awakened Distant Skyline */}
          <path
            d="M0 360V240H54V185H112V220H156V145H218V210H264V160H330V235H384V130H456V200H510V172H576V230H642V150H710V215H768V175H836V235H892V140H966V208H1024V165H1096V228H1164V152H1236V210H1292V178H1356V225H1410V190H1440V360H0Z"
            fill="url(#neonTower1)"
            stroke="#8B5CF6"
            strokeOpacity="0.45"
            strokeWidth="1"
          />

          {/* Awakened Foreground Skyline */}
          <path
            d="M0 360V270H95V220H172V280H240V200H310V265H395V235H475V290H545V215H622V275H700V245H780V285H855V210H930V270H1015V240H1095V288H1175V220H1260V278H1345V248H1440V360H0Z"
            fill="url(#neonTower2)"
            stroke="#38BDF8"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />

          {/* Illuminated Neon Pastel Windows */}
          <g>
            <rect x="740" y="188" width="12" height="16" fill="#EC4899" opacity="0.85" />
            <rect x="760" y="188" width="12" height="16" fill="#38BDF8" opacity="0.8" />
            <rect x="875" y="228" width="10" height="14" fill="#38BDF8" opacity="0.9" />
            <rect x="895" y="228" width="10" height="14" fill="#EC4899" opacity="0.85" />
            <rect x="875" y="250" width="10" height="14" fill="#8B5CF6" opacity="0.85" />
            <rect x="915" y="228" width="10" height="14" fill="#38BDF8" opacity="0.7" />
            <rect x="1036" y="186" width="12" height="16" fill="#EC4899" opacity="0.8" />
            <rect x="1056" y="186" width="12" height="16" fill="#F472B6" opacity="0.75" />
            <rect x="1192" y="236" width="10" height="14" fill="#38BDF8" opacity="0.85" />
            <rect x="1212" y="236" width="10" height="14" fill="#8B5CF6" opacity="0.85" />
            <rect x="1232" y="236" width="10" height="14" fill="#EC4899" opacity="0.85" />
            <rect x="1364" y="262" width="10" height="14" fill="#38BDF8" opacity="0.8" />
            <rect x="1384" y="262" width="10" height="14" fill="#EC4899" opacity="0.85" />
            <rect x="404" y="252" width="10" height="14" fill="#EC4899" opacity="0.8" />
            <rect x="424" y="252" width="10" height="14" fill="#38BDF8" opacity="0.8" />
            <rect x="190" y="235" width="10" height="14" fill="#8B5CF6" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* Central Small Guiding Light (ดวงไฟนำทางดวงเล็ก) at the split boundary */}
      <div
        className="absolute bottom-6 -translate-x-1/2 transition-all duration-700 ease-out"
        style={{ left: `${splitPercent}%` }}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#EC4899]/35 via-[#8B5CF6]/30 to-[#38BDF8]/35 blur-xl" />
          <div className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_20px_6px_rgba(236,72,153,0.75)]" />
        </div>
      </div>
    </div>
  );
};
