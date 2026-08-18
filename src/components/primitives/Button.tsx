import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'link' | 'subtle';
  action?: 'primary' | 'secondary' | 'positive' | 'negative' | 'default';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  action = 'primary',
  size = 'md',
  isFullWidth = false,
  isDisabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}) => {
  // Size styles matching Gluestack specs
  const sizeStyles = {
    xs: 'px-2.5 py-1 text-[11px] rounded-lg gap-1 font-semibold',
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5 font-semibold',
    md: 'px-4 py-2.5 text-xs rounded-xl gap-2 font-bold',
    lg: 'px-5 py-3 text-sm rounded-2xl gap-2 font-bold',
    xl: 'px-6 py-3.5 text-base rounded-2xl gap-2.5 font-extrabold',
  }[size];

  // Action / Variant styles with Salibay primary brand (#E6007E) and accents
  const variantStyles = {
    solid: {
      primary: 'bg-[#E6007E] text-white hover:bg-[#d00072] active:bg-[#b30062] shadow-xs',
      secondary: 'bg-zinc-900 text-white hover:bg-zinc-800 active:bg-black shadow-xs',
      positive: 'bg-[#22C55E] text-white hover:bg-[#16a34a] active:bg-[#15803d] shadow-xs',
      negative: 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-xs',
      default: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300',
    }[action],
    outline: {
      primary: 'border border-[#E6007E] text-[#E6007E] hover:bg-[#E6007E]/5 active:bg-[#E6007E]/10',
      secondary: 'border border-zinc-900 text-zinc-900 hover:bg-zinc-100 active:bg-zinc-200',
      positive: 'border border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E]/5 active:bg-[#22C55E]/10',
      negative: 'border border-rose-600 text-rose-600 hover:bg-rose-50 active:bg-rose-100',
      default: 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100',
    }[action],
    subtle: {
      primary: 'bg-[#E6007E]/10 text-[#E6007E] hover:bg-[#E6007E]/20',
      secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
      positive: 'bg-emerald-50 text-[#22C55E] hover:bg-emerald-100',
      negative: 'bg-rose-50 text-rose-600 hover:bg-rose-100',
      default: 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100',
    }[action],
    link: {
      primary: 'text-[#E6007E] hover:underline p-0 bg-transparent',
      secondary: 'text-zinc-900 hover:underline p-0 bg-transparent',
      positive: 'text-[#22C55E] hover:underline p-0 bg-transparent',
      negative: 'text-rose-600 hover:underline p-0 bg-transparent',
      default: 'text-zinc-500 hover:underline p-0 bg-transparent',
    }[action],
  }[variant];

  return (
    <button
      disabled={isDisabled || isLoading}
      className={`inline-flex items-center justify-center transition-all select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${
        isFullWidth ? 'w-full' : ''
      } ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
