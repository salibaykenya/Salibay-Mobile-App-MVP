import React, { useState } from 'react';
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';
import { SALIBAY_CONTACT_INFO } from '../data/mockData';

export const ContactSupportScreen: React.FC = () => {
  const { showToast, goBack } = useApp();
  const [subject, setSubject] = useState('Order Tracking Inquiry');
  const [orderNumber, setOrderNumber] = useState('SB-940210');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      showToast('Error', 'Please enter your message or inquiry.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage('');
      showToast(
        'Inquiry Submitted',
        'Your ticket has been received. Our Nairobi concierge will reply within 2 hours.',
        'success'
      );
    }, 600);
  };

  const handleWhatsApp = () => {
    showToast('Connecting to WhatsApp', 'Opening WhatsApp Support with Salibay Concierge...', 'info');
  };

  const handleCall = () => {
    showToast('Calling Helpline', `Dialing ${SALIBAY_CONTACT_INFO.phone}...`, 'info');
  };

  const handleEmail = () => {
    showToast('Opening Email', `Composing email to ${SALIBAY_CONTACT_INFO.email}...`, 'info');
  };

  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="Contact Support" showBack showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Support Banner */}
        <div className="p-4 rounded-2xl bg-zinc-900 text-white shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#22C55E]">
              Nairobi Concierge Online
            </span>
          </div>
          <h2 className="text-base font-black text-white">We're here to help you</h2>
          <p className="text-xs text-zinc-300 mt-1">
            Reach out via WhatsApp for fast responses, call our helpline, or send a support ticket below.
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div className="grid grid-cols-2 gap-2">
          {/* WhatsApp Direct */}
          <Card
            size="sm"
            variant="elevated"
            className="p-3.5 bg-white border border-zinc-200 hover:border-emerald-300 cursor-pointer shadow-xs"
            onClick={handleWhatsApp}
          >
            <div className="p-2 rounded-xl bg-emerald-50 text-[#22C55E] w-fit mb-2">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-zinc-900">WhatsApp Chat</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{SALIBAY_CONTACT_INFO.whatsapp}</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
              <span>Open Chat</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </Card>

          {/* Direct Phone Call */}
          <Card
            size="sm"
            variant="elevated"
            className="p-3.5 bg-white border border-zinc-200 hover:border-pink-300 cursor-pointer shadow-xs"
            onClick={handleCall}
          >
            <div className="p-2 rounded-xl bg-pink-50 text-[#E6007E] w-fit mb-2">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-zinc-900">Phone Helpline</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{SALIBAY_CONTACT_INFO.phone}</div>
            <div className="text-[10px] text-[#E6007E] font-semibold mt-2 flex items-center gap-1">
              <span>Call Now</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </Card>
        </div>

        {/* Operating Hours & Office Location */}
        <Card size="sm" variant="elevated" className="p-4 bg-white border border-zinc-200 divide-y divide-zinc-100 shadow-xs">
          <div className="pb-3 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">Operating Hours (EAT)</div>
              <div className="text-xs text-zinc-600 mt-0.5">{SALIBAY_CONTACT_INFO.businessHours}</div>
              <div className="text-[10px] text-zinc-400">Sunday: Urgent WhatsApp assistance only</div>
            </div>
          </div>

          <div className="pt-3 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">Salibay Nairobi Logistics Hub</div>
              <div className="text-xs text-zinc-600 mt-0.5">{SALIBAY_CONTACT_INFO.officeAddress}</div>
              <div className="text-[10px] text-zinc-400">Central pickup & returns inspection centre</div>
            </div>
          </div>
        </Card>

        {/* Send Ticket Form */}
        <Card size="md" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-pink-50 text-[#E6007E]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-zinc-900">Send an In-App Support Message</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Inquiry Topic</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:border-[#E6007E] focus:outline-hidden"
              >
                <option>Order Tracking Inquiry</option>
                <option>Customs & JKIA Clearance</option>
                <option>Payment & M-Pesa Verification</option>
                <option>Return & Refund Request</option>
                <option>Product Sourcing Inquiry</option>
                <option>Other Question</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Order Number (Optional)
              </label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. SB-940210"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:border-[#E6007E] focus:outline-hidden font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Describe your issue or question in detail..."
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:border-[#E6007E] focus:outline-hidden"
                required
              />
            </div>

            <Button
              id="support-submit-ticket-btn"
              type="submit"
              variant="solid"
              action="primary"
              size="md"
              isDisabled={isSubmitting}
              className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold py-2.5"
            >
              {isSubmitting ? (
                <span>Sending Ticket...</span>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Support Request</span>
                </div>
              )}
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};
