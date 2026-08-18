import React from 'react';
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  CreditCard,
  Lock,
  Phone,
  Shield,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Card } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const PaymentInfoScreen: React.FC = () => {
  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="Payment Information" showBack showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Header Hero */}
        <div className="p-5 rounded-2xl bg-zinc-900 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold w-fit mb-2">
              <ShieldCheck className="w-3 h-3 text-[#22C55E]" />
              <span>SAFARICOM & PESAPAL VERIFIED</span>
            </div>
            <h1 className="text-lg font-black text-white">
              Safe, Flexible Kenyan Payments
            </h1>
            <p className="text-xs text-zinc-300 mt-1">
              Pay seamlessly in Kenyan Shillings (KES) with 1-tap M-Pesa STK Push, secure debit/credit cards, or Pay on Delivery in Nairobi.
            </p>
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="space-y-3">
          {/* Method 1: M-Pesa STK Push */}
          <Card size="md" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-[#22C55E] shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-zinc-900">1. M-Pesa STK Push (Instant)</h3>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Enter your Safaricom phone number at checkout. An automated prompt will appear directly on your phone screen asking you to enter your M-Pesa PIN. Your order is confirmed in real time.
                </p>
              </div>
            </div>
          </Card>

          {/* Method 2: Credit / Debit Cards via Pesapal */}
          <Card size="md" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-zinc-900">2. Visa & Mastercard (Pesapal)</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Pay securely using local or international Visa and Mastercard debit or credit cards. Fully encrypted with 3D-Secure bank OTP verification via the licensed Pesapal gateway.
                </p>
              </div>
            </div>
          </Card>

          {/* Method 3: Pay on Delivery */}
          <Card size="md" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 shrink-0">
                <Banknote className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-zinc-900">3. Pay on Delivery (Nairobi Only)</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Available exclusively for local ready stock delivered within Nairobi County. Pay via cash or M-Pesa till to the rider upon inspecting the sealed package.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Global Orders Prepayment Notice */}
        <Card size="sm" variant="elevated" className="p-4 bg-pink-50/70 border border-pink-200 shadow-xs">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#E6007E] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-zinc-900">Prepayment Requirement</h4>
              <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                All <strong className="text-zinc-800">Salibay Global</strong> imported items and deliveries destined <strong className="text-zinc-800">Outside Nairobi</strong> require 100% upfront prepayment to initiate international air freight booking and courier manifests.
              </p>
            </div>
          </div>
        </Card>

        {/* Security Trust Badges */}
        <Card size="sm" variant="elevated" className="p-4 bg-zinc-900 text-white shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-[#22C55E]" />
            <h4 className="text-xs font-bold text-white">Bank-Grade Transaction Security</h4>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Salibay does not retain your credit card CVV numbers or banking passwords. All communications are protected with 256-bit TLS encryption.
          </p>
        </Card>
      </main>
    </div>
  );
};
