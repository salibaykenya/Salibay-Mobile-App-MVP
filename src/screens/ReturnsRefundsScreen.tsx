import React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  HelpCircle,
  MessageCircle,
  PackageX,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const ReturnsRefundsScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="Returns & Refunds" showBack showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Header Hero */}
        <div className="p-5 rounded-2xl bg-zinc-900 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold w-fit mb-2">
              <RefreshCw className="w-3 h-3 text-blue-400" />
              <span>7-DAY EASY RETURN POLICY</span>
            </div>
            <h1 className="text-lg font-black text-white">
              Shop with Complete Peace of Mind
            </h1>
            <p className="text-xs text-zinc-300 mt-1">
              If your item is defective, damaged, or not as described, return it within 7 days for a replacement or full refund.
            </p>
          </div>
        </div>

        {/* 4-Step Return Process */}
        <Card size="md" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
          <h2 className="text-xs font-bold uppercase text-zinc-400 mb-3">
            How Returns Work in 4 Simple Steps
          </h2>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-pink-50 text-[#E6007E] font-bold text-xs flex items-center justify-center shrink-0 border border-pink-200">
                1
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900">Initiate Return Request</div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  Go to <strong className="text-zinc-700">My Orders</strong>, select your order, and tap "Request Return", or message our WhatsApp concierge with your Order #.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-pink-50 text-[#E6007E] font-bold text-xs flex items-center justify-center shrink-0 border border-pink-200">
                2
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900">Rider Pickup or Drop-off</div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  In Nairobi, our rider will collect the package from your address. Outside Nairobi, drop it at any Fargo Courier or Wells Fargo branch.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-pink-50 text-[#E6007E] font-bold text-xs flex items-center justify-center shrink-0 border border-pink-200">
                3
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900">Quality Inspection</div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  Our Nairobi technical team inspects the item within 24 to 48 hours of receipt at our Westlands hub.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-50 text-[#22C55E] font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200">
                4
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900">Instant Refund or Replacement</div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  Once verified, your refund is credited instantly to your M-Pesa account, or 2-5 days for bank cards.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Eligibility Criteria */}
        <div className="grid grid-cols-2 gap-2">
          <Card size="sm" variant="elevated" className="p-3 bg-emerald-50/50 border border-emerald-200">
            <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>Eligible for Return</span>
            </div>
            <ul className="text-[11px] text-emerald-800 space-y-1 pl-1">
              <li>• Manufacturing defects or malfunctions</li>
              <li>• Wrong item or color received</li>
              <li>• Damaged during transit</li>
              <li>• Unopened item with seal intact</li>
            </ul>
          </Card>

          <Card size="sm" variant="elevated" className="p-3 bg-rose-50/50 border border-rose-200">
            <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5 mb-1.5">
              <PackageX className="w-4 h-4 text-rose-600" />
              <span>Non-Returnable Items</span>
            </div>
            <ul className="text-[11px] text-rose-800 space-y-1 pl-1">
              <li>• In-ear earbuds (for hygiene)</li>
              <li>• Software licenses or digital codes</li>
              <li>• Items damaged by misuse or liquid</li>
              <li>• Requests after 7 days</li>
            </ul>
          </Card>
        </div>

        {/* Refund Method Timelines */}
        <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs divide-y divide-zinc-100">
          <h3 className="text-xs font-bold uppercase text-zinc-400 pb-2">Refund Processing Timelines</h3>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
              <div>
                <div className="text-xs font-bold text-zinc-900">M-Pesa STK Refund</div>
                <div className="text-[10px] text-zinc-500">Sent directly to original mobile number</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#22C55E]">Instant (24h)</span>
          </div>

          <div className="pt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <div>
                <div className="text-xs font-bold text-zinc-900">Credit / Debit Card (Pesapal)</div>
                <div className="text-[10px] text-zinc-500">Reversed to issuing bank card</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-zinc-700">2-5 Business Days</span>
          </div>
        </Card>

        {/* Quick CTA */}
        <Button
          id="returns-contact-support-btn"
          variant="solid"
          action="primary"
          size="lg"
          className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold"
          onPress={() => navigateTo('contact_support')}
        >
          <MessageCircle className="w-4 h-4 mr-1.5" />
          <span>Contact Concierge to Start a Return</span>
        </Button>
      </main>
    </div>
  );
};
