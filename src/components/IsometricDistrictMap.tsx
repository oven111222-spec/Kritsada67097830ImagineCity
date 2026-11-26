import React from 'react';
import { TRACK_ORDER, TRACKS, TrackId } from '../data/imagineCityData';

interface IsometricDistrictMapProps {
  activeTracks: TrackId[];
  onSelectTrack?: (id: TrackId) => void;
  interactive?: boolean;
}

const DISTRICT_COORDS: Record<
  TrackId,
  { cx: number; cy: number; labelX: number; labelY: number }
> = {
  DGA: { cx: 170, cy: 115, labelX: 170, labelY: 162 },
  DGD: { cx: 330, cy: 115, labelX: 330, labelY: 162 },
  IGD: { cx: 250, cy: 185, labelX: 250, labelY: 235 },
  AFX: { cx: 130, cy: 235, labelX: 130, labelY: 282 },
  DEN: { cx: 370, cy: 235, labelX: 370, labelY: 282 },
};

export const IsometricDistrictMap: React.FC<IsometricDistrictMapProps> = ({
  activeTracks,
  onSelectTrack,
  interactive = true,
}) => {
  return (
    <div className="relative w-full rounded-xl bg-[#0B1120] border border-white/10 p-4 sm:p-6 overflow-hidden">
      <div className="flex items-center justify-between gap-4 mb-3 text-xs text-slate-400">
        <span>แผนผังเมือง Imagine City แบบ Isometric</span>
        <span className="font-mono-num">5 DISTRICTS · SDM</span>
      </div>

      <svg
        viewBox="0 0 500 320"
        className="w-full h-auto max-h-[340px] mx-auto select-none"
        role="img"
        aria-label="แผนที่เมือง Imagine City 5 ย่าน"
      >
        {/* Isometric Grid Lines */}
        <g stroke="#1E293B" strokeWidth="1">
          <line x1="60" y1="185" x2="440" y2="185" />
          <line x1="250" y1="45" x2="250" y2="290" />
          <line x1="170" y1="115" x2="330" y2="115" strokeDasharray="4 4" />
          <line x1="170" y1="115" x2="250" y2="185" strokeDasharray="4 4" />
          <line x1="330" y1="115" x2="250" y2="185" strokeDasharray="4 4" />
          <line x1="130" y1="235" x2="250" y2="185" strokeDasharray="4 4" />
          <line x1="370" y1="235" x2="250" y2="185" strokeDasharray="4 4" />
        </g>

        {/* Central Guiding Light */}
        <circle cx="250" cy="185" r="56" fill="#EC4899" fillOpacity="0.06" />

        {/* 5 Isometric District Diamonds */}
        {TRACK_ORDER.map((id) => {
          const track = TRACKS[id];
          const pos = DISTRICT_COORDS[id];
          const isActive = activeTracks.includes(id);

          // Isometric diamond polygon points around (cx, cy)
          const w = 52;
          const h = 28;
          const depth = 14;
          const topPoints = `${pos.cx},${pos.cy - h} ${pos.cx + w},${pos.cy} ${pos.cx},${pos.cy + h} ${pos.cx - w},${pos.cy}`;
          const leftSide = `${pos.cx - w},${pos.cy} ${pos.cx},${pos.cy + h} ${pos.cx},${pos.cy + h + depth} ${pos.cx - w},${pos.cy + depth}`;
          const rightSide = `${pos.cx},${pos.cy + h} ${pos.cx + w},${pos.cy} ${pos.cx + w},${pos.cy + depth} ${pos.cx},${pos.cy + h + depth}`;

          return (
            <g
              key={id}
              onClick={() => interactive && onSelectTrack?.(id)}
              className={interactive ? 'cursor-pointer group' : ''}
            >
              {/* Soft glow if active */}
              {isActive && (
                <ellipse
                  cx={pos.cx}
                  cy={pos.cy}
                  rx={62}
                  ry={34}
                  fill={track.accentHex}
                  fillOpacity="0.18"
                />
              )}

              {/* Isometric Extruded Sides */}
              <polygon
                points={leftSide}
                fill={isActive ? track.accentHex : '#1E293B'}
                fillOpacity={isActive ? 0.55 : 0.9}
                stroke={isActive ? track.accentHex : '#334155'}
                strokeWidth="1"
              />
              <polygon
                points={rightSide}
                fill={isActive ? track.accentHex : '#0F172A'}
                fillOpacity={isActive ? 0.35 : 0.95}
                stroke={isActive ? track.accentHex : '#334155'}
                strokeWidth="1"
              />

              {/* Top Face */}
              <polygon
                points={topPoints}
                fill={isActive ? track.accentHex : '#1E293B'}
                fillOpacity={isActive ? 0.9 : 0.85}
                stroke={isActive ? '#FFFFFF' : '#475569'}
                strokeWidth={isActive ? '1.8' : '1'}
                className="transition-opacity duration-200 group-hover:opacity-100"
              />

              {/* Code Text inside Isometric Tile */}
              <text
                x={pos.cx}
                y={pos.cy + 4}
                textAnchor="middle"
                fill={isActive ? '#FFFFFF' : '#CBD5E1'}
                fontSize="12"
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
              >
                {id}
              </text>

              {/* District Thai Short Label */}
              <text
                x={pos.labelX}
                y={pos.labelY}
                textAnchor="middle"
                fill={isActive ? '#F8FAFC' : '#94A3B8'}
                fontSize="11"
                fontWeight={isActive ? '600' : '400'}
                fontFamily="IBM Plex Sans Thai, sans-serif"
              >
                {track.districtShort}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
