import React, { useState } from 'react';
import { ArrowLeft, Grid, LayoutList, Search, SlidersHorizontal, X } from 'lucide-react';
import { FilterBottomSheet } from '../components/commerce/FilterBottomSheet';
import { ProductGrid } from '../components/commerce/ProductGrid';
import { Badge, Button } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const SearchResultsScreen: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    selectedCategorySlug,
    goBack,
    navigateTo,
  } = useApp();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'horizontal'>('grid');

  // Filter products based on search query and active filters
  const filteredProducts = products.filter((product) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchSubtitle = product.subtitle.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCategory = product.categoryId.toLowerCase().includes(q);
      if (!matchTitle && !matchSubtitle && !matchBrand && !matchCategory) {
        return false;
      }
    }

    // Category match
    if (activeFilters.category && product.categoryId !== activeFilters.category) {
      return false;
    }
    if (selectedCategorySlug && product.categoryId !== selectedCategorySlug && !activeFilters.category) {
      return false;
    }

    // Origin match
    if (activeFilters.origin && activeFilters.origin !== 'all') {
      if (product.origin !== activeFilters.origin) return false;
    }

    // Verified seller
    if (activeFilters.verifiedSellerOnly && !product.seller.verified) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (activeFilters.sortBy === 'price_low') return a.priceKES - b.priceKES;
    if (activeFilters.sortBy === 'price_high') return b.priceKES - a.priceKES;
    if (activeFilters.sortBy === 'rating') return b.rating - a.rating;
    if (activeFilters.sortBy === 'fastest_delivery') {
      return a.origin === 'local' ? -1 : 1;
    }
    return 0;
  });

  const activeFilterCount =
    (activeFilters.origin && activeFilters.origin !== 'all' ? 1 : 0) +
    (activeFilters.category ? 1 : 0) +
    (activeFilters.verifiedSellerOnly ? 1 : 0);

  return (
    <div className="pb-24 bg-zinc-50 min-h-screen">
      {/* Search Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            className="p-1.5 -ml-1 text-zinc-700 hover:text-zinc-900 rounded-full hover:bg-zinc-100 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div
            onClick={() => navigateTo('search')}
            className="flex-1 flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-xl cursor-pointer border border-zinc-200/60"
          >
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <span className="text-xs text-zinc-900 truncate">
              {searchQuery || selectedCategorySlug || 'All catalog'}
            </span>
          </div>

          <button
            onClick={() => setLayoutMode(layoutMode === 'grid' ? 'horizontal' : 'grid')}
            className="p-2 text-zinc-600 hover:text-zinc-900 rounded-xl hover:bg-zinc-100 cursor-pointer"
            title="Toggle layout"
          >
            {layoutMode === 'grid' ? <LayoutList className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </button>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-zinc-100 overflow-x-auto no-scrollbar">
          <Button
            size="xs"
            variant={activeFilterCount > 0 ? 'solid' : 'outline'}
            action={activeFilterCount > 0 ? 'secondary' : 'default'}
            onClick={() => setIsFilterOpen(true)}
            leftIcon={<SlidersHorizontal className="w-3 h-3" />}
          >
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-3.5 h-3.5 rounded-full bg-[#E6007E] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {/* Quick origin pills */}
          <button
            onClick={() =>
              setActiveFilters((prev) => ({
                ...prev,
                origin: prev.origin === 'local' ? 'all' : 'local',
              }))
            }
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 border transition-all cursor-pointer ${
              activeFilters.origin === 'local'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-zinc-700 border-zinc-200'
            }`}
          >
            🇰🇪 Nairobi Local Stock
          </button>

          <button
            onClick={() =>
              setActiveFilters((prev) => ({
                ...prev,
                origin: prev.origin === 'international' ? 'all' : 'international',
              }))
            }
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 border transition-all cursor-pointer ${
              activeFilters.origin === 'international'
                ? 'bg-pink-50 text-[#E6007E] border-pink-300'
                : 'bg-white text-zinc-700 border-zinc-200'
            }`}
          >
            ✈️ Global Direct Sourced
          </button>
        </div>
      </header>

      {/* Main Results */}
      <main className="px-4 py-4 space-y-4">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>
            Found <strong className="text-zinc-900">{sortedProducts.length}</strong> items
          </span>
          <span className="capitalize text-zinc-600 font-medium">
            {activeFilters.sortBy?.replace('_', ' ') || 'Featured'}
          </span>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">No matching items found</h3>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              Try checking spelling or resetting your filter criteria.
            </p>
            <Button
              size="sm"
              variant="solid"
              action="primary"
              onClick={() => {
                setSearchQuery('');
                setActiveFilters({ origin: 'all' });
              }}
            >
              Reset Search
            </Button>
          </div>
        ) : (
          <ProductGrid products={sortedProducts} layout={layoutMode} columns={2} />
        )}
      </main>

      <FilterBottomSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
};
