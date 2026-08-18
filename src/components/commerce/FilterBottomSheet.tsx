import React from 'react';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  Button,
  Checkbox,
} from '../primitives';
import { useApp } from '../../context/AppContext';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({ isOpen, onClose }) => {
  const { activeFilters, setActiveFilters, resetFilters, categories } = useApp();

  const handleOriginChange = (origin: 'all' | 'local' | 'international') => {
    setActiveFilters((prev) => ({ ...prev, origin }));
  };

  const handleSortChange = (
    sortBy: 'featured' | 'price_low' | 'price_high' | 'rating' | 'fastest_delivery'
  ) => {
    setActiveFilters((prev) => ({ ...prev, sortBy }));
  };

  const handleCategoryToggle = (slug: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      category: prev.category === slug ? undefined : slug,
    }));
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#E6007E]" />
            <h3 className="text-sm font-bold text-zinc-900">Filters & Sorting</h3>
          </div>
          <button
            onClick={resetFilters}
            className="text-xs text-zinc-500 hover:text-[#E6007E] flex items-center gap-1 font-medium px-2 py-1 rounded-lg hover:bg-pink-50 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Scrollable Filters */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 no-scrollbar text-xs">
          {/* Fulfillment Filter */}
          <div>
            <label className="font-bold text-zinc-900 mb-2 block tracking-tight">Fulfillment & Delivery</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'local', label: '⚡ Fast Delivery' },
                { id: 'international', label: '✈️ Salibay Global' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleOriginChange(item.id as any)}
                  className={`py-2 px-2 rounded-xl font-bold text-center border transition-all text-xs cursor-pointer ${
                    activeFilters.origin === item.id
                      ? 'bg-[#E6007E] text-white border-[#E6007E] shadow-xs'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="font-bold text-zinc-900 mb-2 block tracking-tight">Sort By</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'featured', label: 'Featured / Best Match' },
                { id: 'fastest_delivery', label: '⚡ Fastest Delivery' },
                { id: 'price_low', label: 'Price: Low to High' },
                { id: 'price_high', label: 'Price: High to Low' },
                { id: 'rating', label: '★ Highest Rated' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSortChange(item.id as any)}
                  className={`py-2 px-2.5 rounded-xl font-bold text-left border transition-all text-[11px] cursor-pointer ${
                    activeFilters.sortBy === item.id
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="font-bold text-zinc-900 mb-2 block tracking-tight">Category</label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isSelected = activeFilters.category === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryToggle(cat.slug)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Delivery Speed / Stock Options */}
          <div>
            <label className="font-bold text-zinc-900 mb-2 block tracking-tight">Seller & Verification</label>
            <div className="space-y-2">
              <Checkbox
                isChecked={activeFilters.verifiedSellerOnly || false}
                onChange={(checked) =>
                  setActiveFilters((prev) => ({ ...prev, verifiedSellerOnly: checked }))
                }
              >
                Verified Official Distributors Only
              </Checkbox>

              <Checkbox
                isChecked={activeFilters.inStockOnly || false}
                onChange={(checked) =>
                  setActiveFilters((prev) => ({ ...prev, inStockOnly: checked }))
                }
              >
                In Stock for Immediate Dispatch
              </Checkbox>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-zinc-100 shrink-0">
          <Button
            size="md"
            variant="solid"
            action="primary"
            isFullWidth
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </div>
      </ActionsheetContent>
    </Actionsheet>
  );
};
