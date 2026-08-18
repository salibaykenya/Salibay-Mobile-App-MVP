import React from 'react';
import { ArrowLeft, Clock, Hammer, MessageCircle, RefreshCw, ShieldCheck } from 'lucide-react';
import { SalibayLogo } from '../components/common/SalibayLogo';
import { Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const MaintenanceScreen: React.FC = () => {
  const { navigateTo, showToast } = useApp();

  const handleRefresh = () => {
    showToast('Checking Server Status', 'Salibay maintenance ongoing (Expected completion in 15 mins)', 'info');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between p-6 max-w-md mx-auto text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E6007E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex justify-between items-center z-10">
        <SalibayLogo variant="full" size="sm" />
        <button
          onClick={() => navigateTo('home')}
          className="text-xs text-zinc-400 hover:text-white px-3 py-1 bg-white/10 rounded-full"
        >
          Close
        </button>
      </div>

      <div className="my-auto space-y-4 z-10">
        <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 text-[#E6007E] flex items-center justify-center mx-auto shadow-2xl">
          <Hammer className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
            Scheduled System Upgrade
          </span>
          <h1 className="text-xl font-black text-white tracking-tight mt-3">
            Enhancing Salibay Experience
          </h1>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto mt-1 leading-relaxed">
            We are performing scheduled maintenance on our JKIA customs clearance and M-Pesa STK push gateway.
          </p>
        </div>

        <Card size="sm" variant="elevated" className="p-3.5 bg-zinc-900/90 border border-zinc-800 text-left max-w-xs mx-auto text-xs">
          <div className="flex items-center gap-2 text-zinc-300 mb-1">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-bold">Estimated Downtime:</span>
          </div>
          <p className="text-[11px] text-zinc-400 pl-6">
            Expected to conclude by 04:00 AM EAT. Active orders and in-flight deliveries are unaffected.
          </p>
        </Card>
      </div>

      <div className="space-y-2 pb-4 z-10">
        <Button
          id="maintenance-refresh-btn"
          variant="solid"
          action="primary"
          size="lg"
          className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold"
          onPress={handleRefresh}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          <span>Check Status</span>
        </Button>

        <Button
          id="maintenance-whatsapp-btn"
          variant="outline"
          size="md"
          className="w-full justify-center border-zinc-800 text-zinc-300 hover:bg-zinc-900 text-xs"
          onPress={() => navigateTo('contact_support')}
        >
          <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-400" />
          <span>Urgent Order Inquiry via WhatsApp</span>
        </Button>
      </div>
    </div>
  );
};
