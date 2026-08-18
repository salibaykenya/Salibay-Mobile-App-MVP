import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, ShoppingBag, WifiOff } from 'lucide-react';
import { Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const OfflineScreen: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      showToast('Connection Restored', 'Connected back to Salibay Kenya servers.', 'success');
      navigateTo('home');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between p-6 max-w-md mx-auto text-center">
      <div className="flex justify-start">
        <button
          onClick={() => navigateTo('home')}
          className="p-2 -ml-2 rounded-full text-zinc-700 hover:bg-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="my-auto space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-zinc-200/80 text-zinc-600 flex items-center justify-center mx-auto ring-8 ring-zinc-100">
          <WifiOff className="w-10 h-10 text-zinc-500" />
        </div>

        <div>
          <h1 className="text-xl font-black text-zinc-900 tracking-tight">
            No Internet Connection
          </h1>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1 leading-relaxed">
            Please check your Safaricom, Airtel data bundles, or Wi-Fi network and try again.
          </p>
        </div>

        <Card size="sm" variant="elevated" className="p-3 bg-white border border-zinc-200 text-left max-w-xs mx-auto">
          <div className="text-[11px] font-bold text-zinc-800 mb-1">While you are offline:</div>
          <ul className="text-[10px] text-zinc-500 space-y-1">
            <li>• Your cart items are saved locally on this device.</li>
            <li>• Offline orders will sync as soon as you reconnect.</li>
          </ul>
        </Card>
      </div>

      <div className="space-y-2 pb-4">
        <Button
          id="offline-retry-btn"
          variant="solid"
          action="primary"
          size="lg"
          isDisabled={isRetrying}
          className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold"
          onPress={handleRetry}
        >
          {isRetrying ? (
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Checking Network...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </div>
          )}
        </Button>

        <Button
          id="offline-home-btn"
          variant="outline"
          size="md"
          className="w-full justify-center border-zinc-200 text-zinc-700 hover:bg-zinc-100"
          onPress={() => navigateTo('home')}
        >
          <span>Return to Saved Cart & Home</span>
        </Button>
      </div>
    </div>
  );
};
