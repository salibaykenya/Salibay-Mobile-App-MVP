import React from 'react';
import { AlertTriangle, ArrowLeft, Home, MessageCircle, RefreshCw } from 'lucide-react';
import { Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const ErrorScreen: React.FC = () => {
  const { navigateTo } = useApp();

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
        <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto ring-8 ring-rose-50/60">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold">
            Application Exception (500)
          </span>
          <h1 className="text-xl font-black text-zinc-900 tracking-tight mt-3">
            Something went wrong
          </h1>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1 leading-relaxed">
            We encountered an unexpected glitch while loading product catalogs or processing payment requests.
          </p>
        </div>

        <Card size="sm" variant="elevated" className="p-3.5 bg-white border border-zinc-200 text-left max-w-xs mx-auto text-xs">
          <div className="text-[11px] font-mono text-zinc-600">
            Error Code: <span className="font-bold text-zinc-900">ERR_CATALOG_SYNC_TIMEOUT</span>
          </div>
          <p className="text-[10px] text-zinc-400 mt-1">
            Our automated telemetry has logged this incident for immediate resolution.
          </p>
        </Card>
      </div>

      <div className="space-y-2 pb-4">
        <Button
          id="error-retry-btn"
          variant="solid"
          action="primary"
          size="lg"
          className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold"
          onPress={() => navigateTo('home')}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          <span>Reload Application</span>
        </Button>

        <Button
          id="error-support-btn"
          variant="outline"
          size="md"
          className="w-full justify-center border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-xs"
          onPress={() => navigateTo('contact_support')}
        >
          <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-600" />
          <span>Report Problem to Concierge</span>
        </Button>
      </div>
    </div>
  );
};
