import React from 'react';

interface ABMascotProps {
  className?: string;
  size?: number;
}

export const ABMascot: React.FC<ABMascotProps> = ({ className = '', size = 36 }) => {
  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 rounded-xl bg-[#14191B] border border-[#252C2E] p-0.5 shadow-sm ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size - 4}
        height={size - 4}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-lg overflow-hidden"
      >
        {/* Background */}
        <rect width="48" height="48" rx="8" fill="#14191B" />

        {/* Headphone Band */}
        <path d="M11 22C11 14.8203 16.8203 9 24 9C31.1797 9 37 14.8203 37 22" stroke="#69B39A" strokeWidth="2.5" strokeLinecap="round" />

        {/* Left & Right Headphone Cups */}
        <rect x="7" y="19" width="7" height="13" rx="3.5" fill="#191F21" stroke="#69B39A" strokeWidth="1" />
        <rect x="34" y="19" width="7" height="13" rx="3.5" fill="#191F21" stroke="#69B39A" strokeWidth="1" />
        <circle cx="10.5" cy="25.5" r="1.5" fill="#69B39A" />
        <circle cx="37.5" cy="25.5" r="1.5" fill="#69B39A" />

        {/* Main Robot Head Base */}
        <rect x="13" y="16" width="22" height="18" rx="6" fill="#191F21" stroke="#252C2E" strokeWidth="1" />

        {/* Visor Screen */}
        <rect x="16" y="19" width="16" height="10" rx="4" fill="#090B0D" stroke="#69B39A" strokeWidth="1" />

        {/* Robot Eyes */}
        <ellipse cx="20" cy="23.5" rx="1.8" ry="2.2" fill="#69B39A" />
        <ellipse cx="28" cy="23.5" rx="1.8" ry="2.2" fill="#69B39A" />
        <ellipse cx="20.5" cy="22.5" rx="0.6" ry="0.8" fill="#F1EEE7" />
        <ellipse cx="28.5" cy="22.5" rx="0.6" ry="0.8" fill="#F1EEE7" />

        {/* Robot Smile */}
        <path d="M21.5 26.5C22.5 27.2 25.5 27.2 26.5 26.5" stroke="#69B39A" strokeWidth="1" strokeLinecap="round" />

        {/* Top Antenna Accent */}
        <circle cx="24" cy="11" r="2" fill="#C58A52" />
      </svg>
    </div>
  );
};


