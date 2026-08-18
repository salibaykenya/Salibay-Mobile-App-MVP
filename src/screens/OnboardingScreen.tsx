import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Globe, PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { SalibayLogo } from '../components/common/SalibayLogo';
import { Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  highlights: string[];
  image: string;
}

const ONBOARDING_SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Shop Salibay Local',
    subtitle: 'Quality tech, electronics, and daily essentials ready in Nairobi for same-day and next-day dispatch across Kenya.',
    badge: 'KENYA READY STOCK',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: <PackageCheck className="w-8 h-8 text-[#22C55E]" />,
    highlights: [
      'Same-day or next-day delivery in Nairobi (KES 250)',
      'Reliable countrywide courier shipping (KES 300)',
      'Pay on Delivery available for local Nairobi items',
    ],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Search Beyond the Store',
    subtitle: 'Looking for rare tech or global brands? Use live search to source directly from USA, UK, UAE & China with all-inclusive pricing.',
    badge: '100% LANDED COST GUARANTEE',
    badgeColor: 'bg-pink-50 text-[#E6007E] border-pink-200',
    icon: <Globe className="w-8 h-8 text-[#E6007E]" />,
    highlights: [
      'Search millions of global items instantly',
      'KRA customs duties & air freight included upfront',
      'Zero surprise fees upon arrival in Kenya',
    ],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Pay Seamlessly & Track Live',
    subtitle: 'Fast M-Pesa STK Push, Pesapal secure card checkout, and transparent step-by-step courier tracking straight to your doorstep.',
    badge: 'SECURE & VERIFIED',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    highlights: [
      'Instant 1-tap M-Pesa STK Push payments',
      'Live JKIA customs clearance & dispatch notifications',
      '7-day verified returns & responsive Nairobi concierge',
    ],
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
  },
];

export const OnboardingScreen: React.FC = () => {
  const { navigateTo, setHasSeenOnboarding } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleFinish = (target: 'home' | 'sign_in' | 'create_account' = 'home') => {
    setHasSeenOnboarding(true);
    navigateTo(target);
  };

  const handleNext = () => {
    if (currentSlideIndex < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      handleFinish('home');
    }
  };

  const currentSlide = ONBOARDING_SLIDES[currentSlideIndex];
  const isLastSlide = currentSlideIndex === ONBOARDING_SLIDES.length - 1;

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col justify-between p-4 max-w-md mx-auto relative overflow-hidden">
      {/* Top Header with Logo and Skip */}
      <div className="flex items-center justify-between pt-2 px-1 z-10">
        <SalibayLogo variant="full" size="sm" />
        <button
          id="onboarding-skip-btn"
          onClick={() => handleFinish('home')}
          className="text-xs font-semibold text-zinc-400 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Content Card */}
      <div className="my-auto py-4 z-10">
        <div className="relative rounded-3xl overflow-hidden bg-zinc-800/80 border border-zinc-700/60 shadow-2xl p-5 backdrop-blur-md">
          {/* Slide Hero Image */}
          <div className="relative h-44 rounded-2xl overflow-hidden mb-5 bg-zinc-950">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/30" />
            <div className="absolute top-3 left-3">
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border shadow-xs ${currentSlide.badgeColor}`}>
                {currentSlide.badge}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 p-2.5 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-white/10 shadow-lg">
              {currentSlide.icon}
            </div>
          </div>

          {/* Slide Typography */}
          <h2 className="text-xl font-black text-white tracking-tight leading-tight">
            {currentSlide.title}
          </h2>
          <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
            {currentSlide.subtitle}
          </p>

          {/* Bullet Highlights */}
          <div className="mt-4 pt-4 border-t border-zinc-700/60 space-y-2">
            {currentSlide.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {ONBOARDING_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlideIndex
                  ? 'w-7 bg-[#E6007E]'
                  : 'w-2 bg-zinc-700 hover:bg-zinc-600'
              }`}
              title={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2.5 pb-4 z-10">
        {isLastSlide ? (
          <div className="space-y-2">
            <Button
              id="onboarding-get-started-btn"
              variant="solid"
              action="primary"
              size="lg"
              className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold shadow-lg shadow-pink-900/40"
              onPress={() => handleFinish('home')}
            >
              <span>Start Exploring Products</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                id="onboarding-signin-btn"
                variant="outline"
                size="md"
                className="w-full justify-center border-zinc-700 text-white hover:bg-zinc-800 text-xs font-semibold"
                onPress={() => handleFinish('sign_in')}
              >
                Sign In
              </Button>
              <Button
                id="onboarding-signup-btn"
                variant="outline"
                size="md"
                className="w-full justify-center border-zinc-700 text-white hover:bg-zinc-800 text-xs font-semibold"
                onPress={() => handleFinish('create_account')}
              >
                Create Account
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleFinish('home')}
              className="text-xs text-zinc-400 hover:text-white font-medium py-3 px-4"
            >
              Continue as Guest
            </button>

            <Button
              id="onboarding-next-btn"
              variant="solid"
              action="primary"
              size="lg"
              className="flex-1 justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold"
              onPress={handleNext}
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
