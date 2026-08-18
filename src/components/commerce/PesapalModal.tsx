import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  Lock,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Zap,
} from 'lucide-react';
import { Button, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from '../primitives';
import { useApp } from '../../context/AppContext';
import { formatKES } from '../../utils/formatters';

export const PesapalModal: React.FC = () => {
  const { isPesapalModalOpen, closePesapalModal, pesapalAmount, triggerPesapalSuccess, showToast } =
    useApp();

  const [paymentOption, setPaymentOption] = useState<'mpesa' | 'card' | 'airtel'>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('0712345678');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('890');
  const [step, setStep] = useState<'select' | 'processing' | 'success'>('select');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (isPesapalModalOpen) {
      setStep('select');
      setCountdown(3);
    }
  }, [isPesapalModalOpen]);

  useEffect(() => {
    let timer: any;
    if (step === 'processing' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (countdown === 0 && step === 'processing') {
      handleComplete();
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    if (paymentOption === 'mpesa') {
      showToast('Pesapal STK Triggered', 'Safaricom M-Pesa PIN prompt requested.', 'info');
    } else {
      showToast('Processing Card', 'Contacting 3D Secure bank verification...', 'info');
    }
  };

  const handleComplete = () => {
    setStep('success');
    const refCode = 'PP-' + Math.floor(10000000 + Math.random() * 90000000);
    setTimeout(() => {
      triggerPesapalSuccess(refCode);
      showToast('Pesapal Payment Verified', `Transaction reference: ${refCode}`, 'success');
    }, 1000);
  };

  return (
    <Modal isOpen={isPesapalModalOpen} onClose={closePesapalModal} size="md">
      <ModalBackdrop />
      <ModalContent size="md" className="border-0 shadow-2xl overflow-hidden max-w-sm rounded-3xl">
        {/* Pesapal Brand Header */}
        <div className="bg-[#023E8A] px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center">
              <span className="font-extrabold text-[#023E8A] text-xs tracking-tighter">pesa</span>
              <span className="font-extrabold text-rose-600 text-xs tracking-tighter">pal</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-wide">Pesapal Secure Checkout</h3>
              <p className="text-[10px] text-blue-200">Merchant: Salibay Kenya Ltd</p>
            </div>
          </div>
          <ModalCloseButton className="text-white hover:text-zinc-200" />
        </div>

        <ModalBody className="p-4 bg-white space-y-4">
          {step === 'select' && (
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              {/* Total Banner */}
              <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                    Total Amount Due
                  </span>
                  <span className="text-lg font-extrabold text-blue-950 font-mono">
                    {formatKES(pesapalAmount)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  256-Bit SSL Encrypted
                </div>
              </div>

              {/* Payment Tab Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Select Payment Option
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentOption('mpesa')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      paymentOption === 'mpesa'
                        ? 'border-[#22C55E] bg-emerald-50/60 ring-1 ring-[#22C55E]'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-md bg-[#22C55E] text-white flex items-center justify-center font-black text-[10px]">
                      M
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900">M-Pesa</div>
                      <div className="text-[9px] text-zinc-500">Safaricom STK</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentOption('card')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      paymentOption === 'card'
                        ? 'border-[#023E8A] bg-blue-50/60 ring-1 ring-[#023E8A]'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-md bg-[#023E8A] text-white flex items-center justify-center">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900">Card</div>
                      <div className="text-[9px] text-zinc-500">Visa / MC / Amex</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* M-Pesa Input */}
              {paymentOption === 'mpesa' && (
                <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-50 border border-zinc-100 animate-in fade-in-50">
                  <label className="text-xs font-semibold text-zinc-700 block">
                    M-Pesa Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-mono font-bold text-zinc-400">
                      +254
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="712 345 678"
                      required
                      className="w-full pl-14 pr-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-mono font-bold text-zinc-900 focus:ring-1 focus:ring-[#023E8A] outline-hidden"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-500">
                    A prompt will appear instantly on your Safaricom line to enter PIN.
                  </p>
                </div>
              )}

              {/* Card Inputs */}
              {paymentOption === 'card' && (
                <div className="space-y-2 p-3 rounded-2xl bg-zinc-50 border border-zinc-100 animate-in fade-in-50">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-700 block">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 2222 3333 4444"
                      className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-mono font-bold text-zinc-900 focus:ring-1 focus:ring-[#023E8A] outline-hidden"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-zinc-700 block">Expiry</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded-xl text-xs font-mono text-zinc-900 outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-zinc-700 block">CVV</label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded-xl text-xs font-mono text-zinc-900 outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-[#023E8A] hover:bg-[#002D62] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Pay {formatKES(pesapalAmount)} with Pesapal</span>
              </button>

              <p className="text-center text-[10px] text-zinc-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Licensed by Central Bank of Kenya (CBK)
              </p>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-[#023E8A] animate-spin">
                <RefreshCw className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-zinc-900">
                  {paymentOption === 'mpesa' ? 'Awaiting M-Pesa PIN...' : 'Verifying with Bank...'}
                </h4>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  {paymentOption === 'mpesa'
                    ? `Check your phone (+254 ${phoneNumber}). Enter your secret PIN to complete payment.`
                    : 'Confirming with 3D Secure verification gateway.'}
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 flex items-center justify-center text-[#22C55E]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-zinc-900">Payment Approved!</h4>
                <p className="text-xs text-zinc-500">Redirecting to Salibay Order Receipt...</p>
              </div>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
