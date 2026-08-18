import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Globe,
  HelpCircle,
  MessageCircle,
  Package,
  Phone,
  RefreshCw,
  Search,
  Truck,
  User,
} from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Badge, Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';
import { FAQItem, SALIBAY_FAQS } from '../data/mockData';

type FAQCategory = 'all' | 'orders' | 'delivery' | 'payments' | 'returns' | 'account' | 'global';

export const HelpCentreScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const categories: { id: FAQCategory; label: string }[] = [
    { id: 'all', label: 'All Topics' },
    { id: 'orders', label: 'Orders' },
    { id: 'delivery', label: 'Shipping & Delivery' },
    { id: 'payments', label: 'Payments & M-Pesa' },
    { id: 'returns', label: 'Returns & Refunds' },
    { id: 'global', label: 'Salibay Global' },
    { id: 'account', label: 'Account' },
  ];

  const filteredFaqs = SALIBAY_FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="Help Centre" showBack showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Help Search Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg font-black tracking-tight text-white">
              How can we assist you today?
            </h2>
            <p className="text-xs text-zinc-300 mt-1 mb-3.5">
              Find instant answers regarding shipping, M-Pesa, customs, and returns.
            </p>

            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs, e.g. shipping fees, returns..."
                className="w-full pl-9 pr-4 py-2.5 bg-zinc-800/90 border border-zinc-700 text-xs text-white placeholder:text-zinc-400 rounded-xl focus:border-[#E6007E] focus:outline-hidden focus:ring-1 focus:ring-[#E6007E]"
              />
            </div>
          </div>
        </div>

        {/* Quick Help Shortcuts */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => navigateTo('orders')}
            className="p-3 rounded-2xl bg-white border border-zinc-200 text-left hover:border-pink-300 transition-colors shadow-xs"
          >
            <div className="p-2 rounded-xl bg-pink-50 text-[#E6007E] w-fit mb-2">
              <Package className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-zinc-900">Track Order</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Live status</div>
          </button>

          <button
            onClick={() => navigateTo('shipping_policy')}
            className="p-3 rounded-2xl bg-white border border-zinc-200 text-left hover:border-emerald-300 transition-colors shadow-xs"
          >
            <div className="p-2 rounded-xl bg-emerald-50 text-[#22C55E] w-fit mb-2">
              <Truck className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-zinc-900">Shipping Rates</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Kenya fees</div>
          </button>

          <button
            onClick={() => navigateTo('returns_refunds')}
            className="p-3 rounded-2xl bg-white border border-zinc-200 text-left hover:border-blue-300 transition-colors shadow-xs"
          >
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 w-fit mb-2">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-zinc-900">7-Day Returns</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Easy refunds</div>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase text-zinc-400">
              Frequently Asked Questions ({filteredFaqs.length})
            </span>
          </div>

          {filteredFaqs.length === 0 ? (
            <Card size="md" variant="elevated" className="p-6 text-center bg-white border border-zinc-200">
              <HelpCircle className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-zinc-800">No matching help articles found</p>
              <p className="text-[11px] text-zinc-500 mt-1 mb-3">Try a different search keyword or contact support.</p>
              <Button
                variant="outline"
                size="sm"
                className="text-xs mx-auto"
                onPress={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </Card>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <Card
                  key={faq.id}
                  size="sm"
                  variant="elevated"
                  className="bg-white border border-zinc-200 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 flex items-center justify-between text-left gap-3 hover:bg-zinc-50 transition-colors"
                  >
                    <span className="text-xs font-bold text-zinc-900 leading-snug">
                      {faq.question}
                    </span>
                    <div className="p-1 rounded-full text-zinc-400 bg-zinc-100 shrink-0">
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-zinc-600 border-t border-zinc-100 whitespace-pre-line leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>

        {/* Contact Support Banner */}
        <Card size="md" variant="elevated" className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-[#E6007E] text-white shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-bold text-zinc-900">Still need help with your order?</h3>
              <p className="text-[11px] text-zinc-600 mt-0.5 leading-snug">
                Our Nairobi Customer Concierge team is available on WhatsApp and email.
              </p>
              <button
                id="help-contact-support-cta"
                onClick={() => navigateTo('contact_support')}
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E6007E] hover:bg-[#c4006b] text-white text-xs font-bold transition-colors shadow-xs"
              >
                <span>Contact Salibay Support</span>
              </button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};
