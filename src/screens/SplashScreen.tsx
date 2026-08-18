import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { SalibayLogo } from '../components/common/SalibayLogo';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { navigateTo, hasSeenOnboarding } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSeenOnboarding) {
        navigateTo('onboarding');
      } else {
        navigateTo('home');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasSeenOnboarding, navigateTo]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-between p-8 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#E6007E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Spacer */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => navigateTo(hasSeenOnboarding ? 'home' : 'onboarding')}
          className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Center Branding */}
      <div className="flex flex-col items-center text-center space-y-4 z-10 animate-fade-in">
        <div className="p-4 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl backdrop-blur-md">
          <SalibayLogo variant="icon" size="lg" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            SALIBAY<span className="text-[#E6007E]">.</span>
          </h1>
          <p className="text-xs text-zinc-400 font-medium tracking-wide mt-1">
            Shop Local. Search Global. Delivered to Kenya.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          <span>M-Pesa STK & JKIA Customs Integrated</span>
        </div>
      </div>

      {/* Bottom Loading Indicator & Version */}
      <div className="w-full text-center space-y-3 z-10">
        <div className="w-24 h-1 bg-zinc-800 rounded-full mx-auto overflow-hidden">
          <div className="w-full h-full bg-[#E6007E] rounded-full animate-pulse" />
        </div>
        <p className="text-[10px] text-zinc-500 font-mono">
          Salibay Mobile v2.4.0 • Nairobi, Kenya
        </p>
      </div>
    </div>
  );
};
