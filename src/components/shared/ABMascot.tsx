import React from 'react';

interface ABMascotProps {
  className?: string;
  size?: number;
}

export const ABMascot: React.FC<ABMascotProps> = ({ className = '', size = 36 }) => {
  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-br from-[#1E1B4B] via-[#0F172A] to-[#0284C7] p-0.5 border border-[#38BDF8]/40 shadow-lg shadow-[#8B5CF6]/25 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size - 4}
        height={size - 4}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl overflow-hidden"
      >
        {/* Background gradient */}
        <rect width="48" height="48" rx="10" fill="url(#mascotBg)" />

        {/* Outer Glow Halo */}
        <circle cx="24" cy="22" r="18" fill="url(#mascotGlow)" opacity="0.8" />

        {/* Headphone Band */}
        <path d="M11 22C11 14.8203 16.8203 9 24 9C31.1797 9 37 14.8203 37 22" stroke="url(#headbandGrad)" strokeWidth="3" strokeLinecap="round" />

        {/* Left & Right Headphone Cups */}
        <rect x="7" y="19" width="7" height="13" rx="3.5" fill="url(#earcupGrad)" stroke="#38BDF8" strokeWidth="1" />
        <rect x="34" y="19" width="7" height="13" rx="3.5" fill="url(#earcupGrad)" stroke="#38BDF8" strokeWidth="1" />
        <circle cx="10.5" cy="25.5" r="2" fill="#38BDF8" />
        <circle cx="37.5" cy="25.5" r="2" fill="#38BDF8" />

        {/* Main Robot Head Base */}
        <rect x="13" y="16" width="22" height="18" rx="8" fill="url(#headGrad)" stroke="#38BDF8" strokeWidth="1" />

        {/* Visor Screen */}
        <rect x="16" y="19" width="16" height="10" rx="5" fill="#030712" stroke="#8B5CF6" strokeWidth="1" />

        {/* Glowing Robot Eyes (Cute Oval Eyes) */}
        <ellipse cx="20" cy="23.5" rx="2" ry="2.5" fill="#38BDF8" />
        <ellipse cx="28" cy="23.5" rx="2" ry="2.5" fill="#38BDF8" />
        <ellipse cx="20.5" cy="22.5" rx="0.7" ry="0.9" fill="#FFFFFF" />
        <ellipse cx="28.5" cy="22.5" rx="0.7" ry="0.9" fill="#FFFFFF" />

        {/* Robot Smile */}
        <path d="M21.5 26.5C22.5 27.5 25.5 27.5 26.5 26.5" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />

        {/* Cheek Glow Dots */}
        <circle cx="18" cy="26" r="1" fill="#A78BFA" opacity="0.6" />
        <circle cx="30" cy="26" r="1" fill="#A78BFA" opacity="0.6" />

        {/* Chin & Antenna / Top Accent */}
        <circle cx="24" cy="11" r="2" fill="#F97316" stroke="#FFFFFF" strokeWidth="0.8" />

        {/* Gradients */}
        <defs>
          <linearGradient id="mascotBg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#050A18" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>
          <radialGradient id="mascotGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24 22) scale(18)">
            <stop stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="1" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="headbandGrad" x1="11" y1="9" x2="37" y2="9" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="0.5" stopColor="#38BDF8" />
            <stop offset="1" stopColor="#F97316" />
          </linearGradient>
          <linearGradient id="earcupGrad" x1="7" y1="19" x2="14" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1B4B" />
            <stop offset="1" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="headGrad" x1="13" y1="16" x2="35" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E293B" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

