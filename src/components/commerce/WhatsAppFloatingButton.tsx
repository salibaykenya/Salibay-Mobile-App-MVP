import React, { useState } from 'react';
import { MessageCircle, Send, Sparkles, X, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const { activeScreen, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [hasPrompted, setHasPrompted] = useState(true);

  // Avoid overlaying during checkout or search typing
  const isCheckout = activeScreen === 'checkout';

  const quickPrompts = [
    { label: '🚚 Pay on Delivery in Nairobi?', text: 'Hi Salibay, I would like to inquire about Pay on Delivery options in Nairobi.' },
    { label: '📦 Track my existing order', text: 'Hi Salibay support, I need help tracking my package.' },
    { label: '🌍 Sourcing an item from USA/UK', text: 'Hi Salibay team, I am looking for a specific item from USA/UK stores.' },
    { label: '💳 PesaPal / M-Pesa assistance', text: 'Hi Salibay, I need assistance with PesaPal payment checkout.' },
  ];

  const handleOpenWhatsApp = (text: string) => {
    const phone = '254700000000'; // Salibay WhatsApp Official Support Number
    const encoded = encodeURIComponent(text.trim() || 'Hi Salibay, I need assistance with an order on the app.');
    const waUrl = `https://wa.me/${phone}?text=${encoded}`;
    
    showToast('Connecting to WhatsApp', 'Opening Salibay Live Concierge on WhatsApp...', 'info');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    handleOpenWhatsApp(customMsg);
    setCustomMsg('');
  };

  // Adjust bottom offset depending on whether PDP sticky bar is visible
  const bottomPosition = activeScreen === 'product_detail' ? 'bottom-20' : 'bottom-16 sm:bottom-20';

  if (isCheckout) {
    return null; // Keep checkout screen clean and distraction-free
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <div className={`fixed right-4 ${bottomPosition} z-40 flex flex-col items-end select-none`}>
        {/* Subtle conversion prompt badge (disappears after first interaction) */}
        {!isOpen && hasPrompted && (
          <div
            onClick={() => setIsOpen(true)}
            className="mb-2 bg-white text-zinc-800 text-[11px] font-semibold py-1.5 px-3 rounded-2xl shadow-md border border-zinc-200/80 flex items-center gap-1.5 cursor-pointer hover:bg-zinc-50 transition-transform active:scale-95 animate-in fade-in slide-in-from-bottom-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span>Chat on WhatsApp</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasPrompted(false);
              }}
              className="p-0.5 text-zinc-400 hover:text-zinc-600 ml-1 rounded-full"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* WhatsApp Icon FAB */}
        <button
          id="whatsapp-floating-trigger"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 ${
            isOpen
              ? 'bg-zinc-900 text-white rotate-90'
              : 'bg-[#25D366] text-white hover:bg-[#20bd5a] hover:scale-105 shadow-[#25D366]/30'
          }`}
          aria-label="WhatsApp Live Chat"
          title="WhatsApp Live Chat with Salibay Concierge"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <MessageCircle className="w-6 h-6 fill-current text-white" />
          )}
        </button>
      </div>

      {/* Floating WhatsApp Live Chat Card */}
      {isOpen && (
        <div className={`fixed right-4 ${bottomPosition} mb-14 z-50 w-[320px] sm:w-[350px] bg-white rounded-3xl shadow-2xl border border-zinc-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150`}>
          {/* Card Header */}
          <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-sm">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                <span className="w-2.5 h-2.5 bg-[#25D366] border-2 border-[#075E54] rounded-full absolute bottom-0 right-0" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Salibay Support</span>
                  <span className="bg-[#25D366] text-zinc-950 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                    LIVE
                  </span>
                </h4>
                <p className="text-[10px] text-zinc-200">
                  Replies typically in &lt; 5 minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-3.5 bg-zinc-50 space-y-3 max-h-[300px] overflow-y-auto">
            {/* Agent Welcome Bubble */}
            <div className="p-3 bg-white rounded-2xl rounded-tl-xs shadow-2xs border border-zinc-100 text-xs text-zinc-800 space-y-1">
              <div className="text-[10px] font-bold text-[#075E54]">Salibay Concierge Team</div>
              <p className="text-[11px] leading-relaxed text-zinc-700">
                Karibu Salibay! 👋 Need help with checkout, Pay on Delivery in Nairobi, or sourcing a global item? Select a topic or send a message below.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-zinc-400 px-1">
                Frequently Asked
              </span>
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenWhatsApp(q.text)}
                  className="w-full p-2 bg-white hover:bg-emerald-50/70 border border-zinc-200/80 rounded-xl text-left text-xs font-medium text-zinc-800 flex items-center justify-between transition-colors group cursor-pointer"
                >
                  <span className="truncate pr-1 text-[11px]">{q.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#25D366] shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Message Input Form */}
          <form onSubmit={handleSendCustom} className="p-2.5 bg-white border-t border-zinc-100 flex items-center gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type a message on WhatsApp..."
              className="flex-1 px-3 py-2 bg-zinc-100 focus:bg-white text-xs text-zinc-900 placeholder:text-zinc-400 rounded-xl border border-zinc-200 focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] outline-hidden"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-transform active:scale-95 shadow-xs cursor-pointer"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
