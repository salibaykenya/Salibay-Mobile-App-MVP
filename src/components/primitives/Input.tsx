import React, { createContext, useContext } from 'react';

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'outline' | 'underlined' | 'rounded';

interface InputContextValue {
  size: InputSize;
  variant: InputVariant;
  isDisabled?: boolean;
  isInvalid?: boolean;
}

const InputContext = createContext<InputContextValue>({
  size: 'md',
  variant: 'outline',
});

export interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: InputSize;
  variant?: InputVariant;
  isDisabled?: boolean;
  isInvalid?: boolean;
  children: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  size = 'md',
  variant = 'outline',
  isDisabled = false,
  isInvalid = false,
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-9 text-xs px-2.5 rounded-xl',
    md: 'h-10 text-xs px-3 rounded-xl',
    lg: 'h-12 text-sm px-4 rounded-2xl',
  }[size];

  const variantClasses = {
    outline: 'border border-zinc-200 bg-zinc-50/80 focus-within:bg-white focus-within:border-[#E6007E] focus-within:ring-1 focus-within:ring-[#E6007E]',
    underlined: 'border-b border-zinc-200 rounded-none px-0 bg-transparent focus-within:border-[#E6007E]',
    rounded: 'border border-zinc-200 bg-zinc-50/80 focus-within:bg-white focus-within:border-[#E6007E] rounded-full px-4',
  }[variant];

  const stateClasses = isInvalid
    ? 'border-rose-500 ring-1 ring-rose-500'
    : isDisabled
    ? 'opacity-50 cursor-not-allowed bg-zinc-100'
    : '';

  return (
    <InputContext.Provider value={{ size, variant, isDisabled, isInvalid }}>
      <div
        className={`relative flex items-center transition-all ${sizeClasses} ${variantClasses} ${stateClasses} ${className}`}
        {...props}
      >
        {children}
      </div>
    </InputContext.Provider>
  );
};

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className = '', ...props }, ref) => {
    const { isDisabled } = useContext(InputContext);

    return (
      <input
        ref={ref}
        disabled={isDisabled}
        className={`flex-1 w-full bg-transparent text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden disabled:cursor-not-allowed text-inherit ${className}`}
        {...props}
      />
    );
  }
);
InputField.displayName = 'InputField';

export interface InputSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const InputSlot: React.FC<InputSlotProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex items-center justify-center shrink-0 text-zinc-400 ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface InputIconProps {
  as: React.ElementType;
  className?: string;
}

export const InputIcon: React.FC<InputIconProps> = ({ as: Component, className = '' }) => {
  return <Component className={`w-4 h-4 text-zinc-400 ${className}`} />;
};
