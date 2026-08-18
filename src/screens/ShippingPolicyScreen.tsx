import React from 'react';
import {
  CheckCircle2,
  Clock,
  Globe,
  MapPin,
  Package,
  Plane,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Badge, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const ShippingPolicyScreen: React.FC = () => {
  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="Shipping & Delivery" showBack showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Header Hero */}
        <div className="p-5 rounded-2xl bg-zinc-900 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold w-fit mb-2">
              <Truck className="w-3 h-3 text-[#22C55E]" />
              <span>TRANSPARENT KENYA SHIPPING</span>
            </div>
            <h1 className="text-lg font-black text-white">
              Fast, Reliable Delivery Across Kenya
            </h1>
            <p className="text-xs text-zinc-300 mt-1">
              Flat rates, guaranteed delivery timeframes, and 100% pre-cleared customs for all international imports.
            </p>
          </div>
        </div>

        {/* Shipping Rates Breakdown Cards */}
        <div className="space-y-3">
          {/* Nairobi Local */}
          <Card size="md" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-[#22C55E]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">Nairobi Region Delivery</h3>
                  <p className="text-[10px] text-zinc-500">Same-Day or Next-Day Dispatch</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-black text-[#22C55E]">KES 250</span>
                <div className="text-[9px] text-zinc-400 font-bold uppercase">Flat Rate</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-100 grid grid-cols-2 gap-2 text-xs text-zinc-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Within 24 Hours</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Pay on Delivery Available</span>
              </div>
            </div>
          </Card>

          {/* Outside Nairobi */}
          <Card size="md" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">Outside Nairobi (Upcountry)</h3>
                  <p className="text-[10px] text-zinc-500">Nakuru, Mombasa, Kisumu, Eldoret, etc.</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-black text-blue-600">KES 300</span>
                <div className="text-[9px] text-zinc-400 font-bold uppercase">Flat Rate</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-100 grid grid-cols-2 gap-2 text-xs text-zinc-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>2 - 3 Business Days</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-blue-600" />
                <span>Prepaid Courier Dispatch</span>
              </div>
            </div>
          </Card>

          {/* Salibay Global Air Cargo */}
          <Card size="md" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-pink-50 text-[#E6007E]">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">Salibay Global Air Freight</h3>
                  <p className="text-[10px] text-zinc-500">From USA, UK, UAE & China</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-50 text-[#E6007E] border border-pink-200">
                  Included in Landed Cost
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2 text-xs text-zinc-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>7 - 14 Business Days to your doorstep in Kenya</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Zero surprise customs duty fees at JKIA airport</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Courier Partners */}
        <Card size="sm" variant="elevated" className="p-4 bg-zinc-50 border border-zinc-200 shadow-xs">
          <h3 className="text-xs font-bold uppercase text-zinc-500 mb-2">
            Verified Courier Network
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed mb-3">
            We partner with Kenya's premier logistics providers to ensure secure, tracked delivery:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-zinc-800 font-semibold">
            <div className="p-2 bg-white rounded-xl border border-zinc-200 text-center">
              🏍️ Salibay Express Fleet
            </div>
            <div className="p-2 bg-white rounded-xl border border-zinc-200 text-center">
              🚚 Fargo Courier
            </div>
            <div className="p-2 bg-white rounded-xl border border-zinc-200 text-center">
              🛡️ Wells Fargo Security
            </div>
            <div className="p-2 bg-white rounded-xl border border-zinc-200 text-center">
              📦 Speedaf Express / G4S
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};
