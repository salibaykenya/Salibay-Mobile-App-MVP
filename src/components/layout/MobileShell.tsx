import React, { useState } from 'react';
import {
  Battery,
  CheckCircle2,
  ChevronLeft,
  Laptop,
  Maximize2,
  Minimize2,
  RotateCcw,
  Smartphone,
  Wifi,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CartScreen } from '../../screens/CartScreen';
import { CategoriesScreen } from '../../screens/CategoriesScreen';
import { CheckoutScreen } from '../../screens/CheckoutScreen';
import { HomeScreen } from '../../screens/HomeScreen';
import { OrdersScreen } from '../../screens/OrdersScreen';
import { OrderSuccessScreen } from '../../screens/OrderSuccessScreen';
import { OrderTrackingScreen } from '../../screens/OrderTrackingScreen';
import { ProductDetailScreen } from '../../screens/ProductDetailScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { SearchResultsScreen } from '../../screens/SearchResultsScreen';
import { SearchScreen } from '../../screens/SearchScreen';
import { WishlistScreen } from '../../screens/WishlistScreen';
import { SalibayLogo } from '../common/SalibayLogo';
import { MpesaModal } from '../commerce/MpesaModal';
import { WhatsAppFloatingButton } from '../commerce/WhatsAppFloatingButton';
import { BottomNav } from './BottomNav';

export const MobileShell: React.FC = () => {
  const {
    activeScreen,
    toasts,
    removeToast,
    deviceMode,
    setDeviceMode,
    navigateTo,
  } = useApp();

  const [currentTime] = useState('09:41');

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'categories':
        return <CategoriesScreen />;
      case 'search':
        return <SearchScreen />;
      case 'search_results':
        return <SearchResultsScreen />;
      case 'product_detail':
        return <ProductDetailScreen />;
      case 'cart':
        return <CartScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'order_success':
        return <OrderSuccessScreen />;
      case 'order_tracking':
        return <OrderTrackingScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'wishlist':
        return <WishlistScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Determine whether to show bottom nav
  const hideBottomNav =
    activeScreen === 'product_detail' ||
    activeScreen === 'checkout' ||
    activeScreen === 'order_success';

  return (
    <div className="min-h-screen bg-zinc-200 flex flex-col items-center justify-start p-0 md:p-6 select-none font-sans text-zinc-900">
      {/* Top Simulator Control Bar (visible on desktop) */}
      <aside aria-label="Simulator Controls" className="w-full max-w-md hidden md:flex items-center justify-between px-4 py-2.5 mb-3 bg-zinc-900 text-white rounded-2xl shadow-md text-xs">
        <div className="flex items-center gap-2">
          <SalibayLogo variant="icon" size="sm" />
          <div className="leading-tight">
            <span className="font-bold tracking-tight text-white block">Salibay Mobile</span>
            <span className="text-[10px] text-zinc-400 font-mono">Your Gateway to Global Stores</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setDeviceMode(deviceMode === 'mobile-frame' ? 'fullscreen' : 'mobile-frame')}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 text-[11px]"
            title="Toggle device frame"
          >
            {deviceMode === 'mobile-frame' ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone Frame</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Device Frame Container */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceMode === 'mobile-frame'
            ? 'max-w-[430px] rounded-none sm:rounded-[44px] shadow-2xl border-0 sm:border-8 sm:border-zinc-850 ring-1 ring-black/10'
            : 'max-w-xl rounded-none sm:rounded-3xl shadow-xl'
        } bg-white overflow-hidden relative flex flex-col min-h-screen sm:min-h-[844px] sm:max-h-[920px]`}
      >
        {/* Realistic Mobile Status Bar */}
        <header className="shrink-0 bg-white/95 backdrop-blur-md px-6 pt-3 pb-1.5 flex items-center justify-between text-xs font-semibold text-zinc-900 z-50">
          <span className="font-mono tracking-tight text-[13px]">{currentTime}</span>

          {/* Dynamic Island / Speaker */}
          <div className="w-24 h-4 bg-zinc-950 rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800/80 mr-1.5" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
          </div>

          <div className="flex items-center gap-1.5 text-zinc-800">
            <span className="text-[10px] font-mono font-medium text-zinc-500">Safaricom 5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </header>

        {/* Screen Content Container with Smooth Scroll */}
        <div id="mobile-scroll-container" className="flex-1 overflow-y-auto overflow-x-hidden relative bg-zinc-50 no-scrollbar">
          {renderActiveScreen()}
        </div>

        {/* Global Bottom Navigation */}
        {!hideBottomNav && <BottomNav />}

        {/* Global Lipa na M-Pesa Modal Simulation */}
        <MpesaModal />

        {/* Global WhatsApp Live Chat Concierge */}
        <WhatsAppFloatingButton />

        {/* Notification Toast Stack */}
        {toasts.length > 0 && (
          <aside aria-label="Notifications" className="absolute top-12 left-4 right-4 z-50 space-y-2 pointer-events-none">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className="pointer-events-auto flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-900/95 text-white shadow-xl backdrop-blur-md border border-zinc-800 text-xs animate-in slide-in-from-top-2 duration-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white leading-tight">{toast.title}</div>
                  <div className="text-[11px] text-zinc-300 leading-snug mt-0.5">{toast.message}</div>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-0.5 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </aside>
        )}
      </div>
    </div>
  );
};
