import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, RotateCw, ShieldCheck, Smartphone } from 'lucide-react';
import { SalibayLogo } from '../components/common/SalibayLogo';
import { Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const OtpVerificationScreen: React.FC = () => {
  const { navigateTo, goBack, user, showToast } = useApp();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val[val.length - 1];
    }
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    if (val && index < 5) {
      const nextElem = document.getElementById(`otp-digit-${index + 1}`);
      if (nextElem) nextElem.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const full = digits.join('');
    if (full.length < 6) {
      setError('Please enter all 6 digits of the OTP code');
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showToast('Verified', 'Phone number and identity verified with M-Pesa.', 'success');
      navigateTo('profile');
    }, 600);
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(45);
      showToast('OTP Resent', 'A new 6-digit code has been sent via SMS.', 'info');
    }
  };

  const fillDemoCode = () => {
    setDigits(['5', '9', '2', '8', '3', '1']);
  };

  const targetContact = user?.phone || '+254 712 345 678';

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between p-4 max-w-md mx-auto">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between py-2">
          <button
            id="otp-back-btn"
            onClick={goBack}
            className="p-2 -ml-2 rounded-full text-zinc-700 hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <SalibayLogo variant="full" size="sm" />
          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900"
          >
            Skip
          </button>
        </div>

        {/* Title */}
        <div className="mt-6 mb-5 text-center">
          <div className="w-14 h-14 rounded-3xl bg-pink-50 text-[#E6007E] flex items-center justify-center mx-auto mb-3 ring-8 ring-pink-50/50">
            <Smartphone className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
            Verify your phone
          </h1>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
            We sent a one-time 6-digit code via SMS to{' '}
            <span className="font-bold text-zinc-800 font-mono">{targetContact}</span>.
          </p>
        </div>

        {/* Form Card */}
        <Card size="md" variant="elevated" className="p-5 bg-white border border-zinc-200 shadow-sm text-center">
          <form onSubmit={handleVerify} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-left">
                {error}
              </div>
            )}

            {/* OTP Input Grid */}
            <div className="flex justify-center gap-2 my-2">
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-digit-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-bold font-mono bg-zinc-50 border border-zinc-200 rounded-xl focus:border-[#E6007E] focus:ring-1 focus:ring-[#E6007E] focus:outline-hidden focus:bg-white text-zinc-900 shadow-xs"
                />
              ))}
            </div>

            {/* Prototype Demo Auto Fill */}
            <div className="text-center pt-1">
              <span className="text-[11px] text-zinc-400">Prototype Demo Code: </span>
              <button
                type="button"
                onClick={fillDemoCode}
                className="text-[11px] font-mono font-bold text-[#E6007E] hover:underline"
              >
                592831 (Tap to apply)
              </button>
            </div>

            <Button
              id="otp-verify-submit-btn"
              type="submit"
              variant="solid"
              action="primary"
              size="lg"
              isDisabled={isLoading}
              className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold py-3 mt-2 shadow-sm"
            >
              {isLoading ? 'Verifying Code...' : 'Confirm & Continue'}
            </Button>
          </form>

          {/* Resend Timer */}
          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span>Didn't get the SMS?</span>
            <button
              onClick={handleResend}
              disabled={countdown > 0}
              className="font-bold text-[#E6007E] disabled:text-zinc-400 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 ${countdown > 0 ? '' : 'text-[#E6007E]'}`} />
              <span>{countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Footer Info */}
      <div className="py-4 text-center">
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Secured by Safaricom & Salibay Authentication</span>
        </div>
      </div>
    </div>
  );
};
