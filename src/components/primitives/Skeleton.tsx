import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rounded' | 'sharp' | 'circular';
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rounded',
  className = '',
  ...props
}) => {
  const variantClasses = {
    rounded: 'rounded-2xl',
    sharp: 'rounded-none',
    circular: 'rounded-full',
  }[variant];

  return (
    <div
      className={`animate-pulse bg-zinc-200/80 ${variantClasses} ${className}`}
      {...props}
    />
  );
};

export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
  gap?: number;
}> = ({ lines = 3, className = '', gap = 2 }) => {
  return (
    <div className={`flex flex-col gap-${gap} ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-3 ${
            i === lines - 1 ? 'w-3/5' : i === 0 ? 'w-full' : 'w-4/5'
          } rounded-md`}
        />
      ))}
    </div>
  );
};
