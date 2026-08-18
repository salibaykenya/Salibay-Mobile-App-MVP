import React from 'react';
import { ArrowRight, Plane, Sparkles } from 'lucide-react';
import { Button } from '../primitives';
import { Product } from '../../types';

interface HeroBannerProps {
  featuredProduct?: Product;
  onExploreDrops: () => void;
  onOpenExplainer: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredProduct,
  onExploreDrops,
  onOpenExplainer,
}) => {
  return (
    <div className="relative rounded-3xl bg-zinc-900 text-white p-5 overflow-hidden shadow-sm border border-zinc-800">
      {/* Content */}
      <div className="relative z-10 space-y-2.5 max-w-[230px]">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6007E]/20 text-[#E6007E] border border-[#E6007E]/30 text-[10px] font-bold tracking-wide">
          <Plane className="w-3 h-3 text-[#E6007E]" />
          <span>GLOBAL SHOPPING TO KENYA</span>
        </div>

        <h2 className="text-lg font-black tracking-tight leading-tight">
          Your Gateway to <br />
          <span className="text-[#E6007E]">Global Stores.</span>
        </h2>

        <p className="text-[11px] text-zinc-300 leading-relaxed">
          Shop world-class items with all KRA customs, air cargo, and Pesapal checkout handled seamlessly.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <Button
            size="sm"
            variant="solid"
            action="primary"
            onClick={onOpenExplainer}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Landed Cost Guide
          </Button>

          <Button
            size="sm"
            variant="outline"
            action="default"
            onClick={onExploreDrops}
            className="border-zinc-700 text-zinc-200 hover:bg-white/10 hover:text-white"
          >
            Explore Drops
          </Button>
        </div>
      </div>

      {/* Background Graphic / Product */}
      {featuredProduct && (
        <div className="absolute -right-6 -bottom-6 w-44 h-44 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center p-3">
          <img
            src={featuredProduct.images[0]}
            alt={featuredProduct.title}
            className="w-36 h-36 object-contain rotate-6 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      )}
    </div>
  );
};
