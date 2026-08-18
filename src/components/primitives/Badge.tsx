import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'outline' | 'subtle';
  action?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'subtle',
  action = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[9px] gap-1 rounded-md',
    md: 'px-2 py-0.5 text-[10px] gap-1 rounded-lg',
    lg: 'px-2.5 py-1 text-xs gap-1.5 rounded-xl',
  }[size];

  const variantClasses = {
    solid: {
      primary: 'bg-[#E6007E] text-white',
      secondary: 'bg-zinc-900 text-white',
      success: 'bg-[#22C55E] text-white',
      warning: 'bg-amber-500 text-white',
      error: 'bg-rose-600 text-white',
      info: 'bg-sky-600 text-white',
      muted: 'bg-zinc-600 text-white',
    }[action],
    subtle: {
      primary: 'bg-[#E6007E]/10 text-[#E6007E] border border-[#E6007E]/20',
      secondary: 'bg-zinc-100 text-zinc-800 border border-zinc-200',
      success: 'bg-emerald-50 text-[#22C55E] border border-emerald-200',
      warning: 'bg-amber-50 text-amber-700 border border-amber-200',
      error: 'bg-rose-50 text-rose-700 border border-rose-200',
      info: 'bg-sky-50 text-sky-700 border border-sky-200',
      muted: 'bg-zinc-100 text-zinc-600 border border-zinc-200',
    }[action],
    outline: {
      primary: 'border border-[#E6007E] text-[#E6007E]',
      secondary: 'border border-zinc-900 text-zinc-900',
      success: 'border border-[#22C55E] text-[#22C55E]',
      warning: 'border border-amber-500 text-amber-700',
      error: 'border border-rose-600 text-rose-600',
      info: 'border border-sky-500 text-sky-700',
      muted: 'border border-zinc-300 text-zinc-600',
    }[action],
  }[variant];

  return (
    <div
      className={`inline-flex items-center font-bold font-sans tracking-wide uppercase leading-none select-none ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const BadgeText: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <span className={`truncate ${className}`}>{children}</span>;
};

export const BadgeIcon: React.FC<{ as: React.ElementType; className?: string }> = ({
  as: Component,
  className = '',
}) => {
  return <Component className={`w-3 h-3 shrink-0 ${className}`} />;
};
