import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'elevated' | 'outline' | 'ghost' | 'filled';
  children: React.ReactNode;
  onPress?: (e?: any) => void;
}

export const Card: React.FC<CardProps> = ({
  size = 'md',
  variant = 'elevated',
  children,
  className = '',
  onPress,
  onClick,
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(e);
    if (onPress) onPress(e);
  };

  return (
    <div
      onClick={onClick || onPress ? handleClick : undefined}
      className={`flex flex-col transition-all ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
