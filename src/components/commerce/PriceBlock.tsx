import React from 'react';
import { formatKES } from '../../utils/formatters';

interface PriceBlockProps {
  priceKES: number;
  originalPriceKES?: number;
  discountPercentage?: number;
  size?: 'sm' | 'md' | 'lg';
  showDutyIncluded?: boolean;
  className?: string;
}

export const PriceBlock: React.FC<PriceBlockProps> = ({
  priceKES,
  originalPriceKES,
  discountPercentage,
  size = 'md',
  showDutyIncluded = false,
  className = '',
}) => {
  const sizeStyles = {
    sm: {
      price: 'text-xs font-bold font-mono text-zinc-950',
      orig: 'text-[10px] text-zinc-400 line-through',
      tag: 'text-[9px] px-1 py-0.2 rounded font-bold bg-[#E6007E]/10 text-[#E6007E]',
    },
    md: {
      price: 'text-sm font-extrabold font-mono text-zinc-950',
      orig: 'text-xs text-zinc-400 line-through',
      tag: 'text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-[#E6007E]/10 text-[#E6007E]',
    },
    lg: {
      price: 'text-xl font-black font-mono text-zinc-950 tracking-tight',
      orig: 'text-xs text-zinc-400 line-through',
      tag: 'text-xs px-2 py-0.5 rounded-lg font-bold bg-[#E6007E] text-white',
    },
  }[size];

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className={sizeStyles.price}>{formatKES(priceKES)}</span>
        {originalPriceKES && (
          <span className={sizeStyles.orig}>{formatKES(originalPriceKES)}</span>
        )}
        {discountPercentage && (
          <span className={sizeStyles.tag}>-{discountPercentage}%</span>
        )}
      </div>

      {showDutyIncluded && (
        <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">
          ✓ All KRA customs & VAT prepaid
        </span>
      )}
    </div>
  );
};
