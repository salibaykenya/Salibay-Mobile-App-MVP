import React from 'react';

interface SalibayLogoProps {
  variant?: 'full' | 'icon' | 'wordmark' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Official Salibay Brand Logo Component
 * Matches the official Salibay identity:
 * - Magenta: #E6007E
 * - Green: #22C55E
 * - Tagline: "YOUR GATEWAY TO GLOBAL STORES"
 */
export const SalibayLogo: React.FC<SalibayLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
}) => {
  // Size mapping
  const heightMap = {
    sm: 24,
    md: 32,
    lg: 42,
    xl: 56,
  };

  const h = heightMap[size];

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        style={{ height: h, width: h }}
      >
        {/* Background Magenta Squircle */}
        <rect width="100" height="100" rx="24" fill="#E6007E" />
        
        {/* Top White 'S' Segment */}
        <path
          d="M36 24C27.1634 24 20 31.1634 20 40V48C20 54.6274 25.3726 60 32 60H54L68 46H36C33.7909 46 32 44.2091 32 42V40C32 37.7909 33.7909 36 36 36H70C75.5228 36 80 31.5228 80 26C80 24.8954 79.1046 24 78 24H36Z"
          fill="#FFFFFF"
        />
        
        {/* Bottom Green 'S' Segment */}
        <path
          d="M64 76C72.8366 76 80 68.8366 80 60V52C80 45.3726 74.6274 40 68 40H46L32 54H64C66.2091 54 68 55.7909 68 58V60C68 62.2091 66.2091 64 64 64H30C24.4772 64 20 68.4772 20 74C20 75.1046 20.8954 76 22 76H64Z"
          fill="#22C55E"
        />
      </svg>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={`inline-flex items-center tracking-tight font-extrabold ${className}`}>
        <span className="text-[#E6007E]">SALI</span>
        <span className="text-[#22C55E]">BAY</span>
      </div>
    );
  }

  // Full Brand Logo with Icon + Wordmark + Tagline
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Badge */}
      <div
        className="rounded-xl overflow-hidden shadow-xs shrink-0 flex items-center justify-center"
        style={{ width: h, height: h }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="100" height="100" rx="22" fill="#E6007E" />
          {/* Top White Hook */}
          <path
            d="M35 24C26.7157 24 20 30.7157 20 39V48C20 53.5228 24.4772 58 30 58H56L68 46H34C32.8954 46 32 45.1046 32 44V38C32 36.8954 32.8954 36 34 36H70C75.5228 36 80 31.5228 80 26C80 24.8954 79.1046 24 78 24H35Z"
            fill="#FFFFFF"
          />
          {/* Bottom Green Hook */}
          <path
            d="M65 76C73.2843 76 80 69.2843 80 61V52C80 46.4772 75.5228 42 70 42H44L32 54H66C67.1046 54 68 54.8954 68 56V62C68 63.1046 67.1046 64 66 64H30C24.4772 64 20 68.4772 20 74C20 75.1046 20.8954 76 22 76H65Z"
            fill="#22C55E"
          />
        </svg>
      </div>

      {/* Brand Text & Tagline */}
      <div className="flex flex-col justify-center leading-none">
        <div
          className="font-black tracking-tight font-sans flex items-center"
          style={{ fontSize: Math.max(16, h * 0.58) }}
        >
          <span className="text-[#E6007E]">SALI</span>
          <span className="text-[#22C55E]">BAY</span>
        </div>
        <span
          className="font-black text-zinc-900 tracking-[0.14em] uppercase font-mono mt-0.5"
          style={{ fontSize: Math.max(7, h * 0.22) }}
        >
          YOUR GATEWAY TO GLOBAL STORES
        </span>
      </div>
    </div>
  );
};
