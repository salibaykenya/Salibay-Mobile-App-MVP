import React from 'react';
import { ProductVariantGroup } from '../../types';
import { formatKES } from '../../utils/formatters';

interface VariantSelectorProps {
  variantGroups: ProductVariantGroup[];
  selectedVariants: Record<string, string>;
  onSelectVariant: (groupName: string, optionLabel: string) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variantGroups,
  selectedVariants,
  onSelectVariant,
}) => {
  if (!variantGroups || variantGroups.length === 0) return null;

  return (
    <div className="space-y-4">
      {variantGroups.map((group) => (
        <div key={group.name} className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-900">{group.name}</span>
            <span className="text-zinc-500 font-medium">{selectedVariants[group.name] || 'Select'}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
              const isSelected = selectedVariants[group.name] === option.label;

              return (
                <button
                  key={option.id}
                  onClick={() => onSelectVariant(group.name, option.label)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                      : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  {option.colorHex && (
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: option.colorHex }}
                    />
                  )}
                  <span>{option.label}</span>
                  {option.priceModifierKES && option.priceModifierKES > 0 ? (
                    <span className={`text-[10px] ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      +{formatKES(option.priceModifierKES)}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
