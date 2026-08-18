import React, { useState } from 'react';
import { ArrowLeft, Bell, ChevronDown, Heart, MapPin, Search } from 'lucide-react';
import { LocationModal } from '../commerce/LocationModal';
import { SalibayLogo } from '../common/SalibayLogo';
import { useApp } from '../../context/AppContext';

interface HeaderBarProps {
  showBack?: boolean;
  title?: string;
  showSearch?: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  showBack = false,
  title,
  showSearch = true,
}) => {
  const {
    activeScreen,
    goBack,
    navigateTo,
    deliveryLocation,
    wishlistIds,
    searchQuery,
    setSearchQuery,
  } = useApp();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const isHome = activeScreen === 'home';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('search_results', { searchQuery: searchQuery.trim() });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 px-4 pt-2.5 pb-2.5 transition-all">
        {/* Top line with Logo / Back button and Location + Actions */}
        <div className="flex items-center justify-between gap-2 h-10">
          {showBack ? (
            <div className="flex items-center gap-2">
              <button
                id="header-back-btn"
                onClick={goBack}
                className="p-1.5 -ml-1.5 rounded-full text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              {title ? (
                <h1 className="text-sm font-bold text-zinc-900 truncate">{title}</h1>
              ) : (
                <SalibayLogo variant="full" size="sm" />
              )}
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              <SalibayLogo variant="full" size="sm" />
            </div>
          )}

          {/* Location & Right Action Icons */}
          <div className="flex items-center gap-1.5">
            <button
              id="header-location-selector"
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1 text-left py-1 px-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E6007E]" />
              <div className="leading-tight">
                <div className="text-[9px] text-zinc-500 font-medium">Deliver to</div>
                <div className="text-[11px] font-bold text-zinc-900 truncate max-w-[90px]">
                  {deliveryLocation.area}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-zinc-400 ml-0.5" />
            </button>

            <button
              id="header-wishlist-btn"
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 rounded-full text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
              title="Saved items"
            >
              <Heart className="w-4 h-4" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E6007E] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            <button
              id="header-notifications-btn"
              onClick={() => navigateTo('orders')}
              className="relative p-2 rounded-full text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              title="Order notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#22C55E] rounded-full ring-2 ring-white" />
            </button>
          </div>
        </div>

        {/* Search Bar on Header */}
        {showSearch && (
          <form onSubmit={handleSearchSubmit} className="mt-2">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (activeScreen !== 'search' && activeScreen !== 'search_results') {
                    navigateTo('search');
                  }
                }}
                placeholder="Search products from USA, UK, Kenya..."
                className="w-full pl-9 pr-4 py-2 bg-zinc-100/80 hover:bg-zinc-100 focus:bg-white text-xs text-zinc-900 placeholder:text-zinc-400 rounded-xl border border-transparent focus:border-[#E6007E]/40 focus:ring-1 focus:ring-[#E6007E] focus:outline-hidden transition-all"
              />
            </div>
          </form>
        )}
      </header>

      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
    </>
  );
};
