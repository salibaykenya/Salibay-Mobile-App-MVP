import React, { createContext, useContext } from 'react';

interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({
  value: '',
  onChange: () => {},
  name: 'radio-group',
});

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  name = 'radio-group',
  children,
  className = '',
}) => {
  return (
    <RadioGroupContext.Provider value={{ value, onChange, name }}>
      <div className={`flex flex-col gap-2 ${className}`}>{children}</div>
    </RadioGroupContext.Provider>
  );
};

export interface RadioProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({ value, children, className = '' }) => {
  const { value: selectedValue, onChange, name } = useContext(RadioGroupContext);
  const isSelected = selectedValue === value;

  return (
    <label
      onClick={() => onChange(value)}
      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
        isSelected
          ? 'bg-pink-50/70 border-[#E6007E] text-zinc-900 shadow-xs'
          : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100/80 text-zinc-700'
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
            isSelected ? 'border-[#E6007E] bg-[#E6007E]' : 'border-zinc-300 bg-white'
          }`}
        >
          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
        <div>{children}</div>
      </div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="sr-only"
      />
    </label>
  );
};

export const RadioLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`text-xs font-bold ${className}`}>{children}</div>;
};
