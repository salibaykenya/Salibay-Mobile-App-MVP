import React from 'react';

export interface AvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  name?: string;
  src?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  name = '',
  src,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  }[size];

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'SB';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl overflow-hidden bg-zinc-900 text-white font-black shrink-0 ${sizeClasses} ${className}`}
    >
      {src ? (
        <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
