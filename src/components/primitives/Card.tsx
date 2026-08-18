import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'elevated' | 'outline' | 'ghost' | 'filled';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  size = 'md',
  variant = 'elevated',
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'p-3 rounded-xl gap-2',
    md: 'p-4 rounded-2xl gap-3',
    lg: 'p-5 rounded-3xl gap-4',
  }[size];

  const variantClasses = {
    elevated: 'bg-white border border-zinc-200/80 shadow-xs',
    outline: 'bg-white border border-zinc-200',
    ghost: 'bg-transparent border-0 shadow-none',
    filled: 'bg-zinc-50 border border-zinc-100',
  }[variant];

  return (
    <div className={`flex flex-col transition-all ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};
