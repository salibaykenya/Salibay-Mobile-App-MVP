import React from 'react';
import { FileText, Scale, ShieldCheck } from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Card } from '../components/primitives';
import { SALIBAY_CONTACT_INFO } from '../data/mockData';

export const TermsConditionsScreen: React.FC = () => {
  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="Terms & Conditions" showBack showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Header Hero */}
        <div className="p-4 rounded-2xl bg-zinc-900 text-white shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
              Legal Agreement
            </span>
          </div>
          <h1 className="text-base font-black text-white">Terms of Service & Usage</h1>
          <p className="text-xs text-zinc-300 mt-1">
            Last Updated: October 2026 • Please read these terms carefully before placing an order.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-3">
          <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <h3 className="text-xs font-bold text-zinc-900 mb-1.5">1. Agreement to Terms</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              By downloading the Salibay app, browsing products, or submitting an order, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use the application.
            </p>
          </Card>

          <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <h3 className="text-xs font-bold text-zinc-900 mb-1.5">2. Pricing & Landed Cost Guarantee</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              All prices displayed on Salibay are denominated in Kenyan Shillings (KES) and include applicable Value Added Tax (VAT). For Salibay Global items, the checkout total includes international air cargo shipping, insurance, and all Kenya Revenue Authority (KRA) import customs clearance fees. Salibay guarantees you will never be asked to pay additional customs fees upon package arrival in Kenya.
            </p>
          </Card>

          <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <h3 className="text-xs font-bold text-zinc-900 mb-1.5">3. Shipping & Delivery Terms</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Delivery timelines are estimates calculated from the time of dispatch:
            </p>
            <ul className="list-disc pl-4 mt-2 space-y-1 text-xs text-zinc-600">
              <li><strong className="text-zinc-800">Nairobi Local Stock:</strong> Flat KES 250 fee, delivered within same day to 24 hours.</li>
              <li><strong className="text-zinc-800">Outside Nairobi:</strong> Flat KES 300 fee countrywide, delivered within 2-3 business days.</li>
              <li><strong className="text-zinc-800">Salibay Global Air Cargo:</strong> Delivered in 7-14 business days.</li>
            </ul>
          </Card>

          <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <h3 className="text-xs font-bold text-zinc-900 mb-1.5">4. Payment & Prepayment Rules</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Orders for Salibay Global items and deliveries outside Nairobi require 100% upfront prepayment via M-Pesa or Card to initiate international logistics routing and courier manifests. Pay on Delivery is strictly available for ready local stock delivered within Nairobi.
            </p>
          </Card>

          <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <h3 className="text-xs font-bold text-zinc-900 mb-1.5">5. Governing Law & Dispute Jurisdiction</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              These Terms and Conditions shall be governed by and construed in accordance with the Laws of the Republic of Kenya. Any disputes arising from transactions on Salibay shall be resolved through arbitration in Nairobi, Kenya.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};
