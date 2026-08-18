import React from 'react';
import { Pressable } from '../primitives';
import { Category } from '../../types';

interface CategoryTileProps {
  category: Category;
  onPress: () => void;
  size?: 'sm' | 'md';
}

export const CategoryTile: React.FC<CategoryTileProps> = ({
  category,
  onPress,
  size = 'md',
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex flex-col items-center gap-1.5 shrink-0 group text-center"
    >
      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white border border-zinc-200 p-1 group-hover:border-[#E6007E] transition-all shadow-xs">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <span className="text-[11px] font-medium text-zinc-700 max-w-[68px] truncate">
        {category.name.split(' ')[0]}
      </span>
    </Pressable>
  );
};
