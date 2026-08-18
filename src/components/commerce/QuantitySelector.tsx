import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max?: number;
  onChange: (quantity: number) => void;
  size?: 'sm' | 'md';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const isSmall = size === 'sm';

  return (
    <div
      className={`inline-flex items-center rounded-xl bg-zinc-100/90 border border-zinc-200/80 p-0.5 select-none ${
        isSmall ? 'scale-90' : ''
      }`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-700 hover:bg-white hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        title="Decrease"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="w-8 text-center font-mono font-bold text-xs text-zinc-900">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-700 hover:bg-white hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        title="Increase"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
