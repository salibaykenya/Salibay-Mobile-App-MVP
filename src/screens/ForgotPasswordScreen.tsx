import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, KeyRound, Lock, Mail, Phone, ShieldCheck } from 'lucide-react';
import { SalibayLogo } from '../components/common/SalibayLogo';
import { Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const ForgotPasswordScreen: React.FC = () => {
  const { navigateTo, goBack, showToast } = useApp();
  const [step, setStep] = useState<'request' | 'verify' | 'new_password' | 'success'>('request');
  const [identifier, setIdentifier] = useState('david.ochieng@example.com');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your registered email or phone number');
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('verify');
      showToast('Verification Code Sent', 'Use code 849201 for this demo', 'info');
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const newCode = [...otpCode];
    newCode[index] = value;
    setOtpCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`forgot-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = otpCode.join('');
    if (fullCode.length < 6) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('new_password');
    }, 500);
  };

  const handleNewPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      showToast('Password Updated', 'Your password was successfully reset.', 'success');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between p-4 max-w-md mx-auto">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between py-2">
          <button
            id="forgot-back-btn"
            onClick={goBack}
            className="p-2 -ml-2 rounded-full text-zinc-700 hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <SalibayLogo variant="full" size="sm" />
          <button
            onClick={() => navigateTo('sign_in')}
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900"
          >
            Sign In
          </button>
        </div>

        {/* STEP 1: REQUEST RESET */}
        {step === 'request' && (
          <div className="mt-6">
            <div className="mb-5">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#E6007E] flex items-center justify-center mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
                Reset your password
              </h1>
              <p className="text-xs text-zinc-500 mt-1">
                Enter your registered email address or Kenyan phone number and we will send you a 6-digit verification code.
              </p>
            </div>

            <Card size="md" variant="elevated" className="p-5 bg-white border border-zinc-200 shadow-sm">
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Email or Kenyan Phone Number
                  </label>
                  <input
                    id="forgot-identifier-input"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 0712345678 or name@example.com"
                    className="w-full px-3 py-2.5 bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:outline-hidden focus:ring-1 focus:ring-[#E6007E]"
                    required
                  />
                </div>

                <Button
                  id="forgot-sendcode-btn"
                  type="submit"
                  variant="solid"
                  action="primary"
                  size="lg"
                  isDisabled={isLoading}
                  className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold py-3 mt-2"
                >
                  {isLoading ? 'Sending Code...' : 'Send Verification Code'}
                </Button>
              </form>
            </Card>
          </div>
        )}

        {/* STEP 2: VERIFY OTP */}
        {step === 'verify' && (
          <div className="mt-6">
            <div className="mb-5">
              <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
                Enter 6-digit code
              </h1>
              <p className="text-xs text-zinc-500 mt-1">
                We sent a temporary verification code to <span className="font-bold text-zinc-800">{identifier}</span>.
              </p>
            </div>

            <Card size="md" variant="elevated" className="p-5 bg-white border border-zinc-200 shadow-sm text-center">
              <form onSubmit={handleVerifySubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-left">
                    {error}
                  </div>
                )}

                {/* 6-box input */}
                <div className="flex justify-center gap-2">
                  {otpCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`forgot-otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-11 h-12 text-center text-lg font-bold font-mono bg-zinc-50 border border-zinc-200 rounded-xl focus:border-[#E6007E] focus:ring-1 focus:ring-[#E6007E] focus:outline-hidden focus:bg-white text-zinc-900"
                    />
                  ))}
                </div>

                <div className="text-center pt-1">
                  <span className="text-[11px] text-zinc-400">Demo helper: Code is </span>
                  <button
                    type="button"
                    onClick={() => setOtpCode(['8', '4', '9', '2', '0', '1'])}
                    className="text-[11px] font-mono font-bold text-[#E6007E] hover:underline"
                  >
                    849201 (tap to auto-fill)
                  </button>
                </div>

                <Button
                  id="forgot-verify-btn"
                  type="submit"
                  variant="solid"
                  action="primary"
                  size="lg"
                  isDisabled={isLoading}
                  className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold py-3"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Button>
              </form>
            </Card>
          </div>
        )}

        {/* STEP 3: SET NEW PASSWORD */}
        {step === 'new_password' && (
          <div className="mt-6">
            <div className="mb-5">
              <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
                Create new password
              </h1>
              <p className="text-xs text-zinc-500 mt-1">
                Choose a strong password with at least 6 characters.
              </p>
            </div>

            <Card size="md" variant="elevated" className="p-5 bg-white border border-zinc-200 shadow-sm">
              <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">New Password</label>
                  <input
                    id="forgot-newpassword-input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2.5 bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:outline-hidden focus:ring-1 focus:ring-[#E6007E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Confirm New Password</label>
                  <input
                    id="forgot-confirmnewpassword-input"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-3 py-2.5 bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:outline-hidden focus:ring-1 focus:ring-[#E6007E]"
                    required
                  />
                </div>

                <Button
                  id="forgot-submitnewpassword-btn"
                  type="submit"
                  variant="solid"
                  action="primary"
                  size="lg"
                  isDisabled={isLoading}
                  className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold py-3 mt-2"
                >
                  {isLoading ? 'Updating Password...' : 'Save New Password'}
                </Button>
              </form>
            </Card>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 'success' && (
          <div className="mt-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#22C55E] flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
              Password Reset Complete
            </h1>
            <p className="text-xs text-zinc-500 mt-2 max-w-xs mx-auto mb-6">
              Your password has been successfully updated. You can now sign in with your new credentials.
            </p>

            <Button
              id="forgot-goto-signin-btn"
              variant="solid"
              action="primary"
              size="lg"
              className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold py-3"
              onPress={() => navigateTo('sign_in')}
            >
              Sign In to Salibay
            </Button>
          </div>
        )}
      </div>

      {/* Back to Sign In Link */}
      <div className="py-4 text-center">
        <button
          onClick={() => navigateTo('sign_in')}
          className="text-xs text-zinc-600 hover:text-zinc-900 font-semibold"
        >
          Remember your password? <span className="text-[#E6007E] font-bold">Sign In</span>
        </button>
      </div>
    </div>
  );
};
