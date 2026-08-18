import React, { useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, User } from 'lucide-react';
import { SalibayLogo } from '../components/common/SalibayLogo';
import { Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const CreateAccountScreen: React.FC = () => {
  const { navigateTo, goBack, signUp } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your Kenyan phone number for M-Pesa & delivery updates');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to Salibay Terms & Conditions and Privacy Policy');
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      signUp(fullName, email, phone);
      // Navigate to OTP verification or straight to profile
      navigateTo('otp_verification');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between p-4 max-w-md mx-auto">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between py-2">
          <button
            id="signup-back-btn"
            onClick={goBack}
            className="p-2 -ml-2 rounded-full text-zinc-700 hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <SalibayLogo variant="full" size="sm" />
          <button
            id="signup-guest-header-btn"
            onClick={() => navigateTo('home')}
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900"
          >
            Guest
          </button>
        </div>

        {/* Title */}
        <div className="mt-4 mb-5">
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
            Create Salibay Account
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Join thousands of shoppers in Kenya getting fast local deliveries and global items.
          </p>
        </div>

        {/* Sign Up Form */}
        <Card size="md" variant="elevated" className="p-5 bg-white border border-zinc-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="signup-fullname-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. David Ochieng"
                  className="w-full pl-3 pr-9 py-2.5 bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:outline-hidden focus:ring-1 focus:ring-[#E6007E]"
                  required
                />
                <User className="w-4 h-4 text-zinc-400 absolute right-3 top-3" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="signup-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@example.com"
                  className="w-full pl-3 pr-9 py-2.5 bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:outline-hidden focus:ring-1 focus:ring-[#E6007E]"
                  required
                />
                <Mail className="w-4 h-4 text-zinc-400 absolute right-3 top-3" />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Phone Number (for M-Pesa & Courier SMS)
              </label>
              <div className="relative">
                <input
                  id="signup-phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +254 712 345 678"
                  className="w-full pl-3 pr-9 py-2.5 bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:outline-hidden focus:ring-1 focus:ring-[#E6007E]"
                  required
                />
                <Phone className="w-4 h-4 text-zinc-400 absolute right-3 top-3" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Password</label>
              <div className="relative">
                <input
                  id="signup-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-3 pr-9 py-2.5 bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:outline-hidden focus:ring-1 focus:ring-[#E6007E]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-zinc-400 hover:text-zinc-600 absolute right-2.5 top-2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Confirm Password</label>
              <input
                id="signup-confirmpassword-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full px-3 py-2.5 bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:outline-hidden focus:ring-1 focus:ring-[#E6007E]"
                required
              />
            </div>

            {/* Terms & Privacy Consent */}
            <div className="flex items-start gap-2 pt-1">
              <input
                id="signup-terms-checkbox"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded-sm border-zinc-300 text-[#E6007E] focus:ring-[#E6007E]"
              />
              <label htmlFor="signup-terms-checkbox" className="text-[11px] text-zinc-600 leading-tight">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('terms_conditions')}
                  className="text-[#E6007E] font-semibold hover:underline"
                >
                  Terms & Conditions
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('privacy_policy')}
                  className="text-[#E6007E] font-semibold hover:underline"
                >
                  Privacy Policy
                </button>
                .
              </label>
            </div>

            {/* Submit CTA */}
            <Button
              id="signup-submit-btn"
              type="submit"
              variant="solid"
              action="primary"
              size="lg"
              isDisabled={isLoading}
              className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold py-3 mt-3 shadow-sm"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span>Create My Salibay Account</span>
              )}
            </Button>
          </form>
        </Card>

        {/* Switch to Sign In */}
        <div className="text-center mt-4">
          <p className="text-xs text-zinc-600">
            Already have an account?{' '}
            <button
              id="signup-goto-signin-btn"
              onClick={() => navigateTo('sign_in')}
              className="text-[#E6007E] font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* Guest Exploration Footer */}
      <div className="pt-4 pb-2 text-center space-y-3">
        <button
          id="signup-continue-guest-btn"
          onClick={() => navigateTo('home')}
          className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-700 transition-colors"
        >
          Continue Browsing as Guest
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Encrypted Kenyan Logistics & Secure Store</span>
        </div>
      </div>
    </div>
  );
};
