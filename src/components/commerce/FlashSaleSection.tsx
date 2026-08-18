import React, { useEffect, useState } from 'react';
import { Clock, Flame } from 'lucide-react';
import { CompactProductCard } from './CompactProductCard';
import { Product } from '../../types';

interface FlashSaleSectionProps {
  products: Product[];
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ products }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-lg bg-[#E6007E] text-white">
            <Flame className="w-3.5 h-3.5 fill-white" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900">Salibay Flash Drops</h3>
        </div>

        {/* Countdown Badge */}
        <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-zinc-800 bg-white px-2.5 py-1 rounded-lg border border-zinc-200 shadow-xs">
          <Clock className="w-3.5 h-3.5 text-[#E6007E]" />
          <span>
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {products.map((prod) => (
          <CompactProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};
