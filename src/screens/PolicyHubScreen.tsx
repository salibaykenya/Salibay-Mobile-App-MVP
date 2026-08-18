import React from 'react';
import {
  ChevronRight,
  CreditCard,
  FileText,
  Lock,
  RefreshCw,
  Scale,
  Shield,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Card } from '../components/primitives';
import { useApp } from '../context/AppContext';
import { ActiveScreen } from '../types';

interface PolicyItem {
  id: string;
  title: string;
  subtitle: string;
  screen: ActiveScreen;
  icon: React.ReactNode;
  badge?: string;
}

export const PolicyHubScreen: React.FC = () => {
  const { navigateTo } = useApp();

  const policies: PolicyItem[] = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      subtitle: 'How Salibay handles personal data, M-Pesa records, and cookie usage in Kenya.',
      screen: 'privacy_policy',
      icon: <Lock className="w-5 h-5 text-[#E6007E]" />,
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      subtitle: 'User agreement, pricing rules, customs clearance compliance, and dispute resolution.',
      screen: 'terms_conditions',
      icon: <Scale className="w-5 h-5 text-indigo-600" />,
    },
    {
      id: 'returns',
      title: 'Returns & Refunds Policy',
      subtitle: '7-day inspection window, eligibility criteria, and M-Pesa refund timelines.',
      screen: 'returns_refunds',
      icon: <RefreshCw className="w-5 h-5 text-blue-600" />,
      badge: '7-DAY GUARANTEE',
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery Policy',
      subtitle: 'Nairobi flat KES 250, countrywide KES 300, and Salibay Global air freight timelines.',
      screen: 'shipping_policy',
      icon: <Truck className="w-5 h-5 text-[#22C55E]" />,
      badge: 'COUNTRYWIDE',
    },
    {
      id: 'payments',
      title: 'Payment Information & Security',
      subtitle: 'M-Pesa STK Push, Pesapal gateway, card protection, and Pay on Delivery rules.',
      screen: 'payment_info',
      icon: <CreditCard className="w-5 h-5 text-amber-600" />,
    },
  ];

  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="Legal & Policies" showBack showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Header Summary */}
        <div className="p-4 rounded-2xl bg-zinc-900 text-white shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
              Transparency & Compliance
            </span>
          </div>
          <h2 className="text-base font-black text-white">Salibay Customer Policies</h2>
          <p className="text-xs text-zinc-300 mt-1">
            Official legal documentation, consumer rights, and operational policies governing all transactions on Salibay.
          </p>
        </div>

        {/* Policy Links List */}
        <div className="space-y-2">
          {policies.map((item) => (
            <Card
              key={item.id}
              size="sm"
              variant="elevated"
              className="p-4 bg-white border border-zinc-200 hover:border-pink-300 transition-all cursor-pointer shadow-xs"
              onClick={() => navigateTo(item.screen)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-zinc-50 border border-zinc-100 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-zinc-900">{item.title}</h3>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 leading-snug">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0 mt-1" />
              </div>
            </Card>
          ))}
        </div>

        {/* Source of Truth Disclaimer */}
        <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-200 text-center">
          <p className="text-[11px] text-zinc-600">
            For the most up-to-date documentation or inquiries, visit{' '}
            <span className="font-bold text-zinc-900">salibay.com</span> or contact our legal team at{' '}
            <span className="font-mono text-[#E6007E]">legal@salibay.com</span>.
          </p>
        </div>
      </main>
    </div>
  );
};
