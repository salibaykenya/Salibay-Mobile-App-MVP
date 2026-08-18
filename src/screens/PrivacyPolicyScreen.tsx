import React from 'react';
import { CheckCircle2, Lock, Mail, ShieldCheck } from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Card } from '../components/primitives';
import { SALIBAY_CONTACT_INFO } from '../data/mockData';

export const PrivacyPolicyScreen: React.FC = () => {
  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="Privacy Policy" showBack showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Header Hero */}
        <div className="p-4 rounded-2xl bg-zinc-900 text-white shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-4 h-4 text-[#E6007E]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
              Kenya Data Protection Act Compliant
            </span>
          </div>
          <h1 className="text-base font-black text-white">Salibay Privacy Policy</h1>
          <p className="text-xs text-zinc-300 mt-1">
            Last Updated: October 2026 • Effective for all Salibay Mobile & Web Services.
          </p>
        </div>

        {/* Quick Highlights */}
        <Card size="sm" variant="elevated" className="p-4 bg-emerald-50/70 border border-emerald-200">
          <h2 className="text-xs font-bold text-emerald-900 mb-2">Key Privacy Commitments</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
              <span>We never sell or rent your personal data to third parties.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
              <span>M-Pesa numbers are strictly used for checkout and courier delivery SMS.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
              <span>All payment transactions are encrypted via Pesapal PCI-DSS Level 1 gateway.</span>
            </div>
          </div>
        </Card>

        {/* Policy Sections */}
        <div className="space-y-3">
          {/* Section 1 */}
          <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <h3 className="text-xs font-bold text-zinc-900 mb-1.5">1. Information We Collect</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              When you use Salibay, we collect information necessary to process orders and deliver packages to you in Kenya:
            </p>
            <ul className="list-disc pl-4 mt-2 space-y-1 text-xs text-zinc-600">
              <li><strong className="text-zinc-800">Contact Details:</strong> Full name, phone number, and email address.</li>
              <li><strong className="text-zinc-800">Delivery Information:</strong> County, town/city, street/building name, and house/office unit.</li>
              <li><strong className="text-zinc-800">Payment Metadata:</strong> M-Pesa transaction reference numbers and payment status (we never store card CVV or bank passwords).</li>
              <li><strong className="text-zinc-800">Device & Usage:</strong> IP address, device model, app version, and browsing preferences.</li>
            </ul>
          </Card>

          {/* Section 2 */}
          <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <h3 className="text-xs font-bold text-zinc-900 mb-1.5">2. How We Use Your Information</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              We process your data for the following lawful purposes:
            </p>
            <ul className="list-disc pl-4 mt-2 space-y-1 text-xs text-zinc-600">
              <li>Dispatching and delivering orders via our Nairobi fleet and countrywide courier partners.</li>
              <li>Clearing international shipments with the Kenya Revenue Authority (KRA) at JKIA Airport.</li>
              <li>Sending live order milestones, delivery OTP PINs, and M-Pesa receipts.</li>
              <li>Providing 24/7 customer support via WhatsApp and in-app messaging.</li>
            </ul>
          </Card>

          {/* Section 3 */}
          <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <h3 className="text-xs font-bold text-zinc-900 mb-1.5">3. Third-Party Sharing & Logistics</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              We only share relevant delivery data with trusted service providers under strict data processing agreements:
            </p>
            <ul className="list-disc pl-4 mt-2 space-y-1 text-xs text-zinc-600">
              <li><strong className="text-zinc-800">Couriers:</strong> Fargo Courier, Wells Fargo, G4S, Speedaf, and Salibay motorbike dispatchers.</li>
              <li><strong className="text-zinc-800">Payment Processors:</strong> Safaricom (M-Pesa) and Pesapal Limited.</li>
              <li><strong className="text-zinc-800">Customs Clearance:</strong> Authorized clearing agents at JKIA for KRA customs declaration.</li>
            </ul>
          </Card>

          {/* Section 4 */}
          <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <h3 className="text-xs font-bold text-zinc-900 mb-1.5">4. Your Rights & Data Deletion</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Under the Kenya Data Protection Act 2019, you have the right to request access to your personal data, rectify inaccuracies, or request permanent deletion of your account directly from the app settings.
            </p>
          </Card>

          {/* Section 5 */}
          <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
            <h3 className="text-xs font-bold text-zinc-900 mb-1.5">5. Contact Our Data Protection Officer</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              If you have any questions or data privacy requests, contact us at:
            </p>
            <div className="mt-2 text-xs text-zinc-700 font-mono space-y-0.5">
              <div>Email: {SALIBAY_CONTACT_INFO.email}</div>
              <div>Address: {SALIBAY_CONTACT_INFO.officeAddress}</div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
