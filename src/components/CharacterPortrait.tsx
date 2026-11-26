import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { CharacterCompanion } from '../data/imagineCityData';

interface CharacterPortraitProps {
  character: CharacterCompanion;
  accentHex: string;
  variant?: 'card' | 'medallion' | 'compact';
  className?: string;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  accentHex,
  variant = 'card',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (variant === 'medallion' || variant === 'compact') {
    const sizeClasses =
      variant === 'compact' ? 'w-14 h-14' : 'w-24 h-24 sm:w-28 sm:h-28';
    return (
      <div
        className={`relative rounded-full bg-[#0F172A] overflow-hidden shrink-0 flex items-center justify-center ${sizeClasses} ${className}`}
        style={{
          backgroundImage: `radial-gradient(circle at 50% 42%, rgba(248, 250, 252, 0.22), ${accentHex}38 58%, #0F172A 96%)`,
          boxShadow: `0 0 0 2px ${accentHex}, 0 8px 24px -6px ${accentHex}66`,
        }}
      >
        {hasError ? (
          <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center text-slate-300 p-2 text-center">
            <Sparkles className="w-5 h-5 mb-1" style={{ color: accentHex }} />
            <span className="text-[11px] font-medium leading-tight">
              {character.id}
            </span>
          </div>
        ) : (
          <img
            src={character.image}
            alt={character.name}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-contain object-top scale-[1.38] translate-y-2.5 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
          />
        )}
      </div>
    );
  }

  // 'card' variant: Transparent cutout on dark twilight neon-pastel stage
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#0B1120] flex items-center justify-center ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 46%, rgba(248, 250, 252, 0.2), ${accentHex}2E 52%, #0B1120 88%)`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.1)`,
      }}
    >
      {/* Floor Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-55"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${accentHex}66, transparent 70%)`,
        }}
      />

      {hasError ? (
        <div className="w-full h-full min-h-[220px] bg-slate-800 flex flex-col items-center justify-center text-slate-300 p-4 text-center">
          <Sparkles className="w-8 h-8 mb-2" style={{ color: accentHex }} />
          <span className="text-sm font-medium">{character.name}</span>
          <span className="text-xs text-slate-400 mt-1">{character.roleTitle}</span>
        </div>
      ) : (
        <img
          src={character.image}
          alt={`${character.name} - ${character.roleTitle}`}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="relative z-10 w-full h-full object-contain p-1.5 transition-transform duration-300"
          style={{
            filter: `drop-shadow(0 8px 18px rgba(0, 0, 0, 0.65))`,
          }}
        />
      )}
    </div>
  );
};
