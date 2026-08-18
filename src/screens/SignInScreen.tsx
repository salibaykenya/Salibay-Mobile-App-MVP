import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, Sparkles, User } from 'lucide-react';
import { SalibayLogo } from '../components/common/SalibayLogo';
import { Button, Card, Input } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const SignInScreen: React.FC = () => {
  const { navigateTo, goBack, signIn, showToast } = useApp();
  const [identifier, setIdentifier] = useState('david.ochieng@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your email or phone number');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      signIn(identifier);
      navigateTo('profile');
    }, 600);
  };

  const fillDemoAccount = () => {
    setIdentifier('david.ochieng@example.com');
    setPassword('Salibay@2026');
    showToast('Demo Credentials Loaded', 'Tapped demo user David Ochieng', 'info');
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between p-4 max-w-md mx-auto">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between py-2">
          <button
            id="signin-back-btn"
            onClick={goBack}
            className="p-2 -ml-2 rounded-full text-zinc-700 hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <SalibayLogo variant="full" size="sm" />
          <button
            id="signin-guest-header-btn"
            onClick={() => navigateTo('home')}
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900"
          >
            Guest
          </button>
        </div>

        {/* Title */}
        <div className="mt-6 mb-6">
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
            Welcome back to Salibay
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Sign in to track live JKIA orders, manage addresses, and access saved items.
          </p>
        </div>

        {/* Sign In Form */}
        <Card size="md" variant="elevated" className="p-5 bg-white border border-zinc-200 shadow-sm">
          <form onSubmit={handleSignIn} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Email or Phone */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Email or Kenyan Phone Number
              </label>
              <div className="relative">
                <input
                  id="signin-identifier-input"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 0712345678 or name@example.com"
                  className="w-full pl-3 pr-9 py-2.5 bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white text-xs text-zinc-900 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:outline-hidden focus:ring-1 focus:ring-[#E6007E]"
                  required
                />
                <User className="w-4 h-4 text-zinc-400 absolute right-3 top-3" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-zinc-700">Password</label>
                <button
                  type="button"
                  id="signin-forgot-password-btn"
                  onClick={() => navigateTo('forgot_password')}
                  className="text-xs text-[#E6007E] hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="signin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            {/* Submit Button */}
            <Button
              id="signin-submit-btn"
              type="submit"
              variant="solid"
              action="primary"
              size="lg"
              isDisabled={isLoading}
              className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold py-3 mt-2 shadow-sm"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
            <span className="text-[10px] text-zinc-400 font-mono">Prototype Helper:</span>
            <button
              onClick={fillDemoAccount}
              className="text-[10px] font-bold text-[#E6007E] hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Fill Demo Credentials</span>
            </button>
          </div>
        </Card>

        {/* Switch to Sign Up */}
        <div className="text-center mt-6">
          <p className="text-xs text-zinc-600">
            Don't have a Salibay account?{' '}
            <button
              id="signin-goto-signup-btn"
              onClick={() => navigateTo('create_account')}
              className="text-[#E6007E] font-bold hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>

      {/* Guest Exploration Footer */}
      <div className="pt-6 pb-2 text-center space-y-3">
        <div className="relative flex py-2 items-center">
          <div className="grow border-t border-zinc-200" />
          <span className="shrink mx-3 text-[11px] text-zinc-400 font-medium uppercase">Or</span>
          <div className="grow border-t border-zinc-200" />
        </div>

        <button
          id="signin-continue-guest-btn"
          onClick={() => navigateTo('home')}
          className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-700 transition-colors cursor-pointer"
        >
          Continue Browsing as Guest
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>M-Pesa Verified & 256-bit SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
};
