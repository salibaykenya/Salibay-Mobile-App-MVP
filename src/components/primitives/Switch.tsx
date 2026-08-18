import React from 'react';

export interface SwitchProps {
  isChecked: boolean;
  onToggle: () => void;
  isDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  isChecked,
  onToggle,
  isDisabled = false,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-10 h-5', thumb: 'w-4 h-4', translate: 'translate-x-5' },
    lg: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translate-x-6' },
  }[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={isDisabled}
      onClick={onToggle}
      className={`relative inline-flex shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-hidden ${
        sizeClasses.track
      } ${isChecked ? 'bg-[#E6007E]' : 'bg-zinc-300'} ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <span
        className={`pointer-events-none inline-block rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out ${
          sizeClasses.thumb
        } ${isChecked ? sizeClasses.translate : 'translate-x-0'}`}
      />
    </button>
  );
};
