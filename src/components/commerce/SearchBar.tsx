import React from 'react';
import { Search, X } from 'lucide-react';
import { Input, InputField, InputIcon, InputSlot } from '../primitives';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  onFocus?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  onFocus,
  placeholder = 'Search millions of products',
  autoFocus = false,
  size = 'md',
  className = '',
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <Input size={size} variant="outline" className="bg-zinc-100/80 hover:bg-zinc-100 focus-within:bg-white rounded-xl">
        <InputSlot className="pl-1">
          <InputIcon as={Search} />
        </InputSlot>

        <InputField
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="text-xs"
        />

        {value && (
          <InputSlot className="pr-1 cursor-pointer" onClick={() => onChange('')}>
            <X className="w-3.5 h-3.5 text-zinc-400 hover:text-zinc-900" />
          </InputSlot>
        )}
      </Input>
    </form>
  );
};
