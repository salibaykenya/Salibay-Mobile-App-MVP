import React from 'react';

export interface PressableProps extends React.HTMLAttributes<HTMLDivElement> {
  onPress?: () => void;
  disabled?: boolean;
  activeScale?: boolean;
  children: React.ReactNode;
}

export const Pressable: React.FC<PressableProps> = ({
  onPress,
  disabled = false,
  activeScale = true,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onPress}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onPress?.();
        }
      }}
      className={`cursor-pointer select-none transition-all duration-150 ${
        activeScale ? 'active:scale-[0.97]' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
