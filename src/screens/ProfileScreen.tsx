import React, { useState } from 'react';
import {
  Bell,
  ChevronRight,
  CreditCard,
  Edit3,
  Globe,
  Heart,
  HelpCircle,
  Info,
  Lock,
  LogOut,
  MapPin,
  MessageCircle,
  Package,
  Pencil,
  Phone,
  Scale,
  Settings,
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
    isAuthenticated,
    user,
    setIsSignOutModalOpen,
  } = useApp();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="My Account" showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* User Profile Card */}
        <Card size="md" variant="elevated" className="p-4 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white border-0 shadow-md relative overflow-hidden">
          {isAuthenticated && (
            <button
              id="edit-profile-card-btn"
              onClick={() => setIsEditProfileOpen(true)}
              className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15 backdrop-blur-xs"
            >
              <Pencil className="w-3 h-3 text-pink-400" />
              <span>Edit</span>
            </button>
          )}

          <div className="flex items-center gap-3.5 pr-14">
            <div
              className="relative cursor-pointer"
              onClick={() => (isAuthenticated ? setIsEditProfileOpen(true) : navigateTo('sign_in'))}
            >
              <Avatar
                size="lg"
                name={isAuthenticated ? user?.name || shippingAddress.fullName : 'Guest'}
                src={isAuthenticated ? user?.avatarUrl || shippingAddress.avatarUrl : undefined}
                className="border-2 border-white/20 hover:border-[#E6007E] transition-colors"
              />
              {isAuthenticated && (
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#E6007E] text-white shadow-xs">
                  <Pencil className="w-2.5 h-2.5" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white truncate">
                  {isAuthenticated ? user?.name || shippingAddress.fullName : 'Guest Explorer'}
                </h2>
                {isAuthenticated ? (
                  <span className="bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 text-[9px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5 shrink-0">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    M-Pesa Verified
                  </span>
                ) : (
                  <span className="bg-zinc-700 text-zinc-300 text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0">
                    Guest Mode
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-300 font-mono mt-0.5">
                {isAuthenticated ? user?.phone || shippingAddress.phone : 'Sign in to save addresses & synced orders'}
              </p>
              <p className="text-[11px] text-zinc-400 truncate">
                {isAuthenticated ? user?.email || shippingAddress.email : 'Tap below to sign in or create account'}
              </p>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="mt-4 pt-3 border-t border-zinc-700/60 flex items-center gap-2">
              <Button
                id="profile-signin-btn"
                variant="solid"
                action="primary"
                size="sm"
                className="flex-1 justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold text-xs"
                onPress={() => navigateTo('sign_in')}
              >
                Sign In
              </Button>
              <Button
                id="profile-signup-btn"
                variant="outline"
                size="sm"
                className="flex-1 justify-center border-zinc-600 text-white hover:bg-zinc-800 text-xs font-semibold"
                onPress={() => navigateTo('create_account')}
              >
                Create Account
              </Button>
            </div>
          )}

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

        {/* Shopping & Orders Navigation */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            Shopping & Deliveries
          </label>

          <Card size="sm" variant="elevated" className="bg-white border border-zinc-200 shadow-xs divide-y divide-zinc-100 overflow-hidden">
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
                    {deliveryLocation.area}, {deliveryLocation.county} County (KES {deliveryLocation.feeKES})
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

        {/* Customer Support & Legal */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            Customer Support & Policies
          </label>

          <Card size="sm" variant="elevated" className="bg-white border border-zinc-200 shadow-xs divide-y divide-zinc-100 overflow-hidden">
            <button
              onClick={() => navigateTo('help_centre')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Help Centre & FAQs</div>
                  <div className="text-[10px] text-zinc-500">Instant answers on shipping, returns & customs</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => navigateTo('contact_support')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-[#22C55E]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">WhatsApp & Phone Support</div>
                  <div className="text-[10px] text-zinc-500">Live Nairobi customer concierge</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => navigateTo('policy_hub')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">Legal & Policy Hub</div>
                  <div className="text-[10px] text-zinc-500">Privacy, Terms, Returns & Shipping Policies</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => navigateTo('about')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">About Salibay</div>
                  <div className="text-[10px] text-zinc-500">Our mission & 100% Landed Cost Guarantee</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => navigateTo('settings')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">App Settings & Permissions</div>
                  <div className="text-[10px] text-zinc-500">Notifications, location & system diagnostics</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
          </Card>
        </div>

        {/* Sign Out CTA */}
        {isAuthenticated && (
          <div className="pt-2 text-center">
            <button
              onClick={() => setIsSignOutModalOpen(true)}
              className="text-xs font-semibold text-zinc-500 hover:text-rose-600 flex items-center justify-center gap-1.5 mx-auto py-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Salibay</span>
            </button>
          </div>
        )}

        <div className="text-center pb-2">
          <p className="text-[10px] text-zinc-400 font-mono">Salibay Mobile v2.4.1 • Nairobi, Kenya</p>
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
