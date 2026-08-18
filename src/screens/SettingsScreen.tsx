import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Globe,
  HelpCircle,
  Info,
  Lock,
  LogOut,
  MapPin,
  MessageCircle,
  Moon,
  RefreshCw,
  Scale,
  Shield,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Trash2,
  Truck,
  User,
  Zap,
} from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const SettingsScreen: React.FC = () => {
  const {
    navigateTo,
    isAuthenticated,
    user,
    deliveryLocation,
    setIsSignOutModalOpen,
    setIsDeleteAccountModalOpen,
    setIsSessionExpiredOpen,
    setIsUpdateModalOpen,
    setIsNotificationModalOpen,
    setIsLocationEducationOpen,
    showToast,
  } = useApp();

  const [orderSms, setOrderSms] = useState(true);
  const [promoPush, setPromoPush] = useState(true);

  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="App Settings" showBack showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Account Profile Status */}
        <Card size="md" variant="elevated" className="p-4 bg-white border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-zinc-900 text-white font-bold text-base flex items-center justify-center">
                {isAuthenticated ? user?.name?.charAt(0) || 'D' : <User className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-xs font-bold text-zinc-900">
                  {isAuthenticated ? user?.name : 'Guest User'}
                </h2>
                <p className="text-[11px] text-zinc-500 font-mono">
                  {isAuthenticated ? user?.email : 'Browsing without account'}
                </p>
              </div>
            </div>

            {isAuthenticated ? (
              <button
                onClick={() => setIsSignOutModalOpen(true)}
                className="px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200 cursor-pointer"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => navigateTo('sign_in')}
                className="px-3 py-1.5 text-xs font-bold bg-[#E6007E] text-white hover:bg-[#c4006b] rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </Card>

        {/* Preferences & Notifications */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            Delivery & Notifications
          </label>

          <Card size="sm" variant="elevated" className="bg-white border border-zinc-200 shadow-xs divide-y divide-zinc-100 overflow-hidden">
            {/* Delivery Location */}
            <div
              onClick={() => setIsLocationEducationOpen(true)}
              className="p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-[#22C55E]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Delivery Location</div>
                  <div className="text-[11px] text-zinc-500">
                    {deliveryLocation.county} ({deliveryLocation.area}) • KES {deliveryLocation.feeKES}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>

            {/* Order Tracking SMS */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-pink-50 text-[#E6007E]">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Live Delivery Alerts</div>
                  <div className="text-[11px] text-zinc-500">Courier SMS & JKIA clearance updates</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={orderSms}
                onChange={(e) => {
                  setOrderSms(e.target.checked);
                  showToast('Updated', `Order SMS alerts ${e.target.checked ? 'enabled' : 'disabled'}`);
                }}
                className="h-4 w-4 rounded-sm border-zinc-300 text-[#E6007E] focus:ring-[#E6007E]"
              />
            </div>

            {/* Push Permission Prompt Opener */}
            <div
              onClick={() => setIsNotificationModalOpen(true)}
              className="p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Push Notification Settings</div>
                  <div className="text-[11px] text-zinc-500">Manage device permissions</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>
          </Card>
        </div>

        {/* Support & Legal Links */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            Help & Information
          </label>

          <Card size="sm" variant="elevated" className="bg-white border border-zinc-200 shadow-xs divide-y divide-zinc-100 overflow-hidden">
            <div
              onClick={() => navigateTo('help_centre')}
              className="p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-zinc-900">Help Centre & FAQs</div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>

            <div
              onClick={() => navigateTo('contact_support')}
              className="p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-zinc-900">Contact WhatsApp Support</div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>

            <div
              onClick={() => navigateTo('about')}
              className="p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700">
                  <Info className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-zinc-900">About Salibay</div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>

            <div
              onClick={() => navigateTo('policy_hub')}
              className="p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700">
                  <Scale className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-zinc-900">Legal & Policy Hub</div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>
          </Card>
        </div>

        {/* Prototype QA & System State Simulator */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            Prototype QA & System States
          </label>

          <Card size="sm" variant="elevated" className="p-3 bg-zinc-900 text-white border border-zinc-800 shadow-xs space-y-2">
            <p className="text-[10px] text-zinc-400">
              Interactive test controls to simulate mobile system states:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setIsSessionExpiredOpen(true)}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-left font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Test Session Expired</span>
              </button>

              <button
                onClick={() => setIsUpdateModalOpen(true)}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-left font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>Test App Update</span>
              </button>

              <button
                onClick={() => navigateTo('offline')}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-left font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Test Offline State</span>
              </button>

              <button
                onClick={() => navigateTo('maintenance')}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-left font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Test Maintenance</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Account Deletion (GDPR & Kenya Data Protection Compliance) */}
        {isAuthenticated && (
          <div className="pt-2">
            <button
              id="settings-delete-account-btn"
              onClick={() => setIsDeleteAccountModalOpen(true)}
              className="w-full py-3 px-4 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/60 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete My Account & Personal Data</span>
            </button>
          </div>
        )}

        {/* Version Footer */}
        <div className="text-center pt-2">
          <p className="text-[10px] text-zinc-400 font-mono">
            Salibay Mobile v2.4.1 (Build KE-892)
          </p>
        </div>
      </main>
    </div>
  );
};
