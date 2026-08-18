import React from 'react';
import { Heart, Home, Layers, ShoppingBag, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveScreen } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeScreen, navigateTo, cartCount, wishlistIds, orders } = useApp();

  const navItems: { id: ActiveScreen; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'wishlist', label: 'Saved', icon: Heart },
    { id: 'cart', label: 'Bag', icon: ShoppingBag },
    { id: 'profile', label: 'Account', icon: User },
  ];

  // Check active state
  const isNavActive = (id: ActiveScreen) => {
    if (id === 'home' && activeScreen === 'home') return true;
    if (id === 'categories' && activeScreen === 'categories') return true;
    if (id === 'wishlist' && activeScreen === 'wishlist') return true;
    if (id === 'cart' && (activeScreen === 'cart' || activeScreen === 'checkout')) return true;
    if (
      id === 'profile' &&
      (activeScreen === 'profile' || activeScreen === 'orders' || activeScreen === 'order_tracking')
    )
      return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200/80 px-2 py-1.5 shadow-sm">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(item.id);

          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              onClick={() => navigateTo(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                active ? 'text-[#E6007E] font-bold' : 'text-zinc-400 hover:text-zinc-700'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    active ? 'scale-110 text-[#E6007E]' : ''
                  }`}
                />

                {/* Wishlist count badge */}
                {item.id === 'wishlist' && wishlistIds.length > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1 bg-pink-100 text-[#E6007E] text-[9px] font-mono font-bold rounded-full flex items-center justify-center border border-[#E6007E]/30">
                    {wishlistIds.length}
                  </span>
                )}

                {/* Cart Badge in Salibay Magenta */}
                {item.id === 'cart' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 bg-[#E6007E] text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-in zoom-in-50">
                    {cartCount}
                  </span>
                )}

                {/* Profile / Orders active dot in Salibay Green */}
                {item.id === 'profile' && orders.length > 0 && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-[#22C55E] rounded-full ring-2 ring-white" />
                )}
              </div>

              <span
                className={`text-[10px] mt-1 tracking-tight ${
                  active ? 'font-bold text-[#E6007E]' : 'font-medium'
                }`}
              >
                {item.label}
              </span>

              {/* Active Indicator dot */}
              {active && <span className="w-1 h-1 rounded-full bg-[#E6007E] mt-0.5" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
