import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Badge, BadgeText, Button, Card, Pressable } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const CategoriesScreen: React.FC = () => {
  const { categories, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryClick = (cat: (typeof categories)[0]) => {
    setSelectedCategory(cat);
  };

  const handleSubcategoryClick = (subId: string) => {
    navigateTo('search_results', { categoryId: selectedCategory.slug });
  };

  return (
    <div className="pb-24 bg-zinc-50 min-h-screen">
      <HeaderBar title="Categories" showSearch={true} />

      <main className="px-4 py-4 space-y-4">
        {/* Category Cards List */}
        <div className="space-y-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory.id === cat.id;

            return (
              <Card
                key={cat.id}
                size="sm"
                variant={isSelected ? 'outline' : 'elevated'}
                className={`p-0 overflow-hidden transition-all ${
                  isSelected ? 'border-[#E6007E] ring-1 ring-[#E6007E]' : 'hover:border-zinc-300'
                }`}
              >
                {/* Category Header */}
                <div
                  onClick={() => handleCategoryClick(cat)}
                  className="p-3.5 flex items-center gap-3 cursor-pointer select-none"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-100">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-zinc-900">{cat.name}</h3>
                      <Badge variant="subtle" action="muted" size="sm">
                        <BadgeText>{cat.itemCount} items</BadgeText>
                      </Badge>
                    </div>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">{cat.description}</p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] font-bold text-[#E6007E]">
                      <span>{isSelected ? 'Viewing Options' : 'Explore'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Subcategories drawer if selected */}
                {isSelected && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-zinc-100 bg-pink-50/20">
                    <div className="grid grid-cols-2 gap-1.5 pt-2">
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubcategoryClick(sub.id)}
                          className="p-2.5 bg-white rounded-xl border border-zinc-200/80 hover:border-[#E6007E] text-left transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="text-xs font-semibold text-zinc-900 group-hover:text-[#E6007E]">
                              {sub.name}
                            </div>
                            <div className="text-[10px] text-zinc-400 font-mono">{sub.count} items</div>
                          </div>
                          <ArrowRight className="w-3 h-3 text-zinc-300 group-hover:text-[#E6007E] transition-colors" />
                        </button>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      variant="solid"
                      action="primary"
                      isFullWidth
                      className="mt-2.5"
                      onClick={() => navigateTo('search_results', { categoryId: cat.slug })}
                    >
                      View All {cat.name}
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};
