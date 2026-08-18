import React from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  children?: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onChange,
  children,
  isDisabled = false,
  className = '',
}) => {
  return (
    <label
      onClick={() => !isDisabled && onChange(!isChecked)}
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <div
        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
          isChecked
            ? 'bg-[#E6007E] border-[#E6007E] text-white'
            : 'bg-white border-zinc-300 hover:border-zinc-400'
        }`}
      >
        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
      </div>
      {children && <span className="text-xs font-medium text-zinc-800">{children}</span>}
    </label>
  );
};
