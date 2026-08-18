import React from 'react';
import {
  CheckCircle2,
  Globe,
  Heart,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from 'lucide-react';
import { SalibayLogo } from '../components/common/SalibayLogo';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Badge, Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';
import { SALIBAY_CONTACT_INFO } from '../data/mockData';

export const AboutScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="About Salibay" showBack showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Brand Hero */}
        <div className="p-6 rounded-3xl bg-zinc-950 text-white relative overflow-hidden text-center shadow-lg">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E6007E]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg mb-3">
              <SalibayLogo variant="icon" size="md" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-white">
              SALIBAY<span className="text-[#E6007E]">.</span>
            </h1>
            <p className="text-xs text-zinc-300 font-medium max-w-xs mt-1 leading-relaxed">
              Bridging Kenya with genuine local stock and seamless worldwide product discovery.
            </p>

            <div className="flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-white/10 text-[10px] text-zinc-200 border border-white/10">
              <ShieldCheck className="w-3 h-3 text-[#22C55E]" />
              <span>Headquartered in Westlands, Nairobi, Kenya</span>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <Card size="md" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
          <h2 className="text-xs font-bold uppercase text-zinc-400 mb-2">Our Mission</h2>
          <p className="text-xs text-zinc-700 leading-relaxed font-normal">
            Salibay is built specifically for shoppers in Kenya. We believe access to global electronics, authentic fashion, and high-demand accessories shouldn't come with confusing international shipping calculators, hidden customs clearance surprises, or complex foreign exchange payments.
          </p>
        </Card>

        {/* Two Engines of Salibay */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            How Salibay Works
          </label>

          <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs space-y-3">
            {/* Engine 1: Local Stock */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-[#22C55E] shrink-0">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900">1. Salibay Local Ready Stock</div>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Curated products stored directly in our Nairobi fulfillment hub. Available for same-day and 24-hour delivery in Nairobi (KES 250) or 2-3 business days countrywide (KES 300). Cash & M-Pesa on delivery accepted in Nairobi.
                </p>
              </div>
            </div>

            <div className="border-t border-zinc-100" />

            {/* Engine 2: Global Search */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-pink-50 text-[#E6007E] shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900">2. Live Global Search & Sourcing</div>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Looking for rare items? Search worldwide catalogs directly through the Salibay search bar. We automatically calculate full landed cost (freight + KRA customs duties), clear customs at JKIA airport, and deliver directly to your Kenyan address in 7-14 business days.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Four Customer Guarantees */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            The Salibay Guarantee
          </label>

          <div className="grid grid-cols-2 gap-2">
            <Card size="sm" variant="elevated" className="p-3 bg-white border border-zinc-200 shadow-xs">
              <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5 mb-1 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>100% Landed Cost</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-snug">
                Zero surprise customs duties upon arrival. What you pay at checkout is the final price.
              </p>
            </Card>

            <Card size="sm" variant="elevated" className="p-3 bg-white border border-zinc-200 shadow-xs">
              <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5 mb-1 text-pink-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E6007E]" />
                <span>M-Pesa STK Push</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-snug">
                Frictionless payment in Kenyan Shillings without foreign currency exchange fees.
              </p>
            </Card>

            <Card size="sm" variant="elevated" className="p-3 bg-white border border-zinc-200 shadow-xs">
              <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5 mb-1 text-blue-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>7-Day Returns</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-snug">
                Hassle-free return policy with quick local Nairobi inspection and instant refunding.
              </p>
            </Card>

            <Card size="sm" variant="elevated" className="p-3 bg-white border border-zinc-200 shadow-xs">
              <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5 mb-1 text-purple-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Live WhatsApp</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-snug">
                Real human support in Nairobi available on WhatsApp Monday through Saturday.
              </p>
            </Card>
          </div>
        </div>

        {/* Legal & Policy Hub Link */}
        <button
          onClick={() => navigateTo('policy_hub')}
          className="w-full p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-between transition-colors shadow-sm cursor-pointer"
        >
          <div>
            <div className="text-xs font-bold">Salibay Legal & Policy Hub</div>
            <div className="text-[10px] text-zinc-400">View Privacy, Terms, Shipping & Return Policies</div>
          </div>
          <span className="text-xs text-[#E6007E] font-bold">View Hub →</span>
        </button>

        {/* Footer Info */}
        <div className="text-center pt-2">
          <p className="text-[10px] text-zinc-400 font-mono">
            Salibay Kenya Limited • PIN P052000000X
          </p>
          <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
            {SALIBAY_CONTACT_INFO.officeAddress}
          </p>
        </div>
      </main>
    </div>
  );
};
