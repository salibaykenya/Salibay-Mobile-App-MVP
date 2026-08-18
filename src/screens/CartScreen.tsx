import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Package,
  ShieldCheck,
  ShoppingCart,
  Tag,
  Truck,
} from 'lucide-react';
import { CartItemRow } from '../components/commerce/CartItemRow';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Button, Card, Input, InputField, InputSlot } from '../components/primitives';
import { useApp } from '../context/AppContext';
import { formatKES } from '../utils/formatters';

export const CartScreen: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotalKES,
    cartShippingKES,
    cartTotalKES,
    deliveryLocation,
    navigateTo,
    showToast,
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  const hasLocal = cart.some((i) => i.product.origin === 'local');
  const hasInternational = cart.some((i) => i.product.origin === 'international');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'KARIBU10') {
      const discount = Math.round(cartSubtotalKES * 0.1);
      setAppliedDiscount(discount);
      setPromoError('');
      showToast('Promo Code Applied', '10% Welcome Discount applied!', 'success');
    } else if (promoCode.trim().toUpperCase() === 'SALIBAYFREE') {
      setAppliedDiscount(cartShippingKES);
      setPromoError('');
      showToast('Promo Code Applied', 'Free Delivery coupon applied!', 'success');
    } else {
      setPromoError('Invalid coupon. Try KARIBU10 for 10% off.');
    }
  };

  const finalTotalKES = Math.max(0, cartTotalKES - appliedDiscount);

  if (cart.length === 0) {
    return (
      <div className="pb-24 bg-zinc-50 min-h-screen">
        <HeaderBar title="Shopping Cart" showSearch={false} />

        <div className="px-4 py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-zinc-900">Your cart is empty</h2>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              Explore local Kenyan goods and verified USA & UK global imports.
            </p>
          </div>
          <Button
            size="md"
            variant="solid"
            action="primary"
            onClick={() => navigateTo('home')}
          >
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-zinc-50 min-h-screen">
      <HeaderBar title={`Cart (${cartCount} items)`} showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Mixed Origin Notice if applicable */}
        {hasLocal && hasInternational && (
          <div className="p-3.5 bg-zinc-900 text-white rounded-2xl text-xs space-y-1 shadow-xs border border-zinc-800">
            <div className="flex items-center gap-2 font-bold text-[#22C55E]">
              <Package className="w-4 h-4" />
              <span>Multi-Source Shipment Notice</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              Your cart contains both <strong>Kenya local stock (dispatched in 24h)</strong> and{' '}
              <strong>Global Direct imports (7-9 business days)</strong>. They will arrive in separate secure parcels.
            </p>
          </div>
        )}

        {/* Cart Item Rows */}
        <div className="space-y-2.5">
          {cart.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        {/* Promo Voucher Box */}
        <Card size="sm" variant="elevated" className="space-y-2">
          <label className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#E6007E]" />
            Promo Code or Voucher
          </label>

          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <Input size="sm" variant="outline" className="flex-1">
              <InputField
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="e.g. KARIBU10"
                className="font-mono uppercase text-xs"
              />
            </Input>
            <Button size="sm" variant="solid" action="secondary" type="submit">
              Apply
            </Button>
          </form>

          {appliedDiscount > 0 && (
            <div className="text-[11px] text-[#22C55E] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Coupon applied (-{formatKES(appliedDiscount)})
            </div>
          )}
          {promoError && <div className="text-[11px] text-rose-500">{promoError}</div>}
        </Card>

        {/* Summary Card */}
        <Card size="sm" variant="elevated" className="space-y-2.5 text-xs">
          <h3 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">
            Order Summary
          </h3>

          <div className="flex justify-between text-zinc-600">
            <span>Items Subtotal</span>
            <span className="font-mono font-bold text-zinc-900">{formatKES(cartSubtotalKES)}</span>
          </div>

          <div className="flex justify-between text-zinc-600">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-zinc-400" />
              Delivery to {deliveryLocation.area}
            </span>
            <span className="font-mono font-bold text-zinc-900">
              {cartShippingKES === 0 ? 'FREE' : formatKES(cartShippingKES)}
            </span>
          </div>

          {hasInternational && (
            <div className="flex justify-between text-zinc-600">
              <span className="flex items-center gap-1 text-[#22C55E] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                KRA Customs & Import Duty
              </span>
              <span className="text-[#22C55E] font-bold">PREPAID</span>
            </div>
          )}

          {appliedDiscount > 0 && (
            <div className="flex justify-between text-[#22C55E] font-bold">
              <span>Voucher Discount</span>
              <span className="font-mono">-{formatKES(appliedDiscount)}</span>
            </div>
          )}

          <div className="pt-2 border-t border-zinc-100 flex justify-between items-baseline font-bold text-sm text-zinc-950">
            <span>Total Payable</span>
            <span className="text-base font-mono font-extrabold text-[#E6007E]">
              {formatKES(finalTotalKES)}
            </span>
          </div>
        </Card>
      </main>

      {/* Sticky Bottom Checkout Action */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-zinc-500 font-medium">Total Amount</div>
            <div className="text-base font-extrabold text-zinc-950 font-mono tracking-tight">
              {formatKES(finalTotalKES)}
            </div>
          </div>

          <Button
            id="proceed-to-checkout-btn"
            size="lg"
            variant="solid"
            action="primary"
            className="flex-1"
            onClick={() => navigateTo('checkout')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};
