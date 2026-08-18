import React, { useState } from 'react';
import {
  Bell,
  ChevronRight,
  CreditCard,
  Edit3,
  Globe,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Package,
  Pencil,
  Phone,
  ShieldCheck,
  Smartphone,
  Truck,
  User,
} from 'lucide-react';
import { EditProfileModal } from '../components/commerce/EditProfileModal';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Avatar, Badge, BadgeText, Button, Card, Switch } from '../components/primitives';
import { useApp } from '../context/AppContext';

export const ProfileScreen: React.FC = () => {
  const {
    shippingAddress,
    orders,
    wishlistIds,
    cartCount,
    deliveryLocation,
    navigateTo,
    showToast,
  } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency] = useState('KES (Kenyan Shilling)');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="My Account" showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* User Profile Card */}
        <Card size="md" variant="elevated" className="p-4 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white border-0 shadow-md relative overflow-hidden">
          {/* Edit Profile Quick Trigger */}
          <button
            id="edit-profile-card-btn"
            onClick={() => setIsEditProfileOpen(true)}
            className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15 backdrop-blur-xs"
          >
            <Pencil className="w-3 h-3 text-pink-400" />
            <span>Edit</span>
          </button>

          <div className="flex items-center gap-3.5 pr-14">
            <div className="relative cursor-pointer" onClick={() => setIsEditProfileOpen(true)}>
              <Avatar
                size="lg"
                name={shippingAddress.fullName}
                src={shippingAddress.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                className="border-2 border-white/20 hover:border-[#E6007E] transition-colors"
              />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#E6007E] text-white shadow-xs">
                <Pencil className="w-2.5 h-2.5" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white truncate">{shippingAddress.fullName}</h2>
                <span className="bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 text-[9px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5 shrink-0">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  M-Pesa Verified
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-mono mt-0.5">{shippingAddress.phone}</p>
              <p className="text-[11px] text-zinc-400 truncate">{shippingAddress.email}</p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-zinc-700/60 text-center">
            <div
              onClick={() => navigateTo('orders')}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 cursor-pointer transition-colors"
            >
              <div className="text-sm font-mono font-extrabold text-white">{orders.length}</div>
              <div className="text-[10px] text-zinc-400">Total Orders</div>
            </div>

            <div
              onClick={() => navigateTo('wishlist')}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 cursor-pointer transition-colors"
            >
              <div className="text-sm font-mono font-extrabold text-pink-400">{wishlistIds.length}</div>
              <div className="text-[10px] text-zinc-400">Saved Items</div>
            </div>

            <div
              onClick={() => navigateTo('cart')}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 cursor-pointer transition-colors"
            >
              <div className="text-sm font-mono font-extrabold text-[#22C55E]">{cartCount}</div>
              <div className="text-[10px] text-zinc-400">In Cart</div>
            </div>
          </div>
        </Card>

        {/* Primary Navigation Hub */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            Shopping & Deliveries
          </label>

          <Card size="sm" variant="elevated" className="p-0 divide-y divide-zinc-100 overflow-hidden">
            <button
              onClick={() => navigateTo('orders')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-pink-50 text-[#E6007E]">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">My Orders & Shipments</div>
                  <div className="text-[10px] text-zinc-500">Track live global & local packages</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="subtle" action="primary" size="sm">
                  <BadgeText>{orders.length} Active</BadgeText>
                </Badge>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </div>
            </button>

            <button
              onClick={() => navigateTo('wishlist')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Wishlist & Saved Items</div>
                  <div className="text-[10px] text-zinc-500">Price alerts & saved favorites</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">{wishlistIds.length} items</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </div>
            </button>

            <div className="p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-[#22C55E]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Default Delivery Address</div>
                  <div className="text-[10px] text-zinc-500">
                    {deliveryLocation.area}, {deliveryLocation.county} County
                  </div>
                </div>
              </div>
              <span
                id="edit-address-btn"
                className="text-[10px] font-bold text-[#E6007E] hover:underline cursor-pointer"
                onClick={() => setIsEditProfileOpen(true)}
              >
                Edit
              </span>
            </div>
          </Card>
        </div>

        {/* Global Import Protection */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            Buyer Trust & Guarantees
          </label>

          <Card size="sm" variant="elevated" className="p-0 divide-y divide-zinc-100 overflow-hidden">
            <div className="p-3.5 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-zinc-900">Pesapal Secured Payments</div>
                <div className="text-[10px] text-zinc-500 leading-snug">
                  Encrypted payments supporting M-Pesa, Visa, Mastercard, and American Express.
                </div>
              </div>
            </div>

            <div className="p-3.5 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-zinc-900">Pay on Delivery Available</div>
                <div className="text-[10px] text-zinc-500 leading-snug">
                  Pay via M-Pesa or Cash upon rider arrival for Nairobi region orders.
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Settings & Support */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            Preferences & Support
          </label>

          <Card size="sm" variant="elevated" className="p-0 divide-y divide-zinc-100 overflow-hidden">
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Push Notifications</div>
                  <div className="text-[10px] text-zinc-500">Real-time JKIA customs & delivery alerts</div>
                </div>
              </div>
              <Switch
                isChecked={notificationsEnabled}
                onChange={(checked) => {
                  setNotificationsEnabled(checked);
                  showToast('Notification Settings', checked ? 'Alerts enabled' : 'Alerts muted', 'info');
                }}
              />
            </div>

            <button
              onClick={() => showToast('Salibay Concierge', 'WhatsApp Support: +254 700 000 000 connected', 'success')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Nairobi Customer Concierge</div>
                  <div className="text-[10px] text-zinc-500">24/7 WhatsApp & Live chat support</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
          </Card>
        </div>

        {/* Sign Out CTA */}
        <div className="pt-2 text-center">
          <button
            onClick={() => showToast('Account', 'Demo session active as David Ochieng', 'info')}
            className="text-xs font-semibold text-zinc-500 hover:text-rose-600 flex items-center justify-center gap-1.5 mx-auto py-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch User / Sign Out</span>
          </button>
          <p className="text-[10px] text-zinc-400 font-mono mt-1">Salibay Mobile v2.4.0 • Build KE-890</p>
        </div>
      </main>

      {/* Interactive Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </div>
  );
};
