import React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
  ...props
}) => {
  if (orientation === 'vertical') {
    return <div className={`w-[1px] bg-zinc-200 self-stretch ${className}`} {...props} />;
  }
  return <hr className={`border-0 border-t border-zinc-200/80 my-2 ${className}`} {...props} />;
};
