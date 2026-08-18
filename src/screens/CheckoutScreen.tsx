import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  CreditCard,
  ExternalLink,
  Lock,
  MapPin,
  ShieldCheck,
  Truck,
  Zap,
} from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import {
  Button,
  Card,
  Input,
  InputField,
} from '../components/primitives';
import { SHOPIFY_SHIPPING_METHODS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import {
  BillingAddress,
  PaymentMethodType,
  ShippingAddress,
  ShippingMethodId,
} from '../types';
import { formatKES } from '../utils/formatters';

export const CheckoutScreen: React.FC = () => {
  const {
    cart,
    cartSubtotalKES,
    cartTotalKES,
    shippingMethod,
    setShippingMethod,
    billingAddress,
    setBillingAddress,
    shippingAddress,
    setShippingAddress,
    createOrderFromCart,
    openPesapalModal,
    navigateTo,
    showToast,
  } = useApp();

  const [address, setAddress] = useState<ShippingAddress>(shippingAddress);
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethodId>(shippingMethod);
  const [paymentChoice, setPaymentChoice] = useState<'pesapal' | 'cod'>('pesapal');
  const [billingSame, setBillingSame] = useState(billingAddress.sameAsShipping ?? true);
  const [customBilling, setCustomBilling] = useState<BillingAddress>({
    sameAsShipping: false,
    fullName: '',
    phone: '',
    county: 'Nairobi',
    townCity: '',
    estateBuilding: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleCustomBillingChange = (field: keyof BillingAddress, value: string) => {
    setCustomBilling((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectShipping = (methodId: ShippingMethodId) => {
    setSelectedShipping(methodId);
    setShippingMethod(methodId);

    // If Pay on Delivery shipping method is chosen, default payment method to COD
    if (methodId === 'pay_on_delivery') {
      setPaymentChoice('cod');
    } else if (paymentChoice === 'cod') {
      setPaymentChoice('pesapal');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Persist address and billing in state
    setShippingAddress(address);
    setBillingAddress({
      sameAsShipping: billingSame,
      ...(billingSame ? {} : customBilling),
    });

    if (paymentChoice === 'pesapal') {
      // Launch Shopify -> Pesapal checkout gateway simulator
      openPesapalModal((pesapalRef) => {
        const order = createOrderFromCart('pesapal', pesapalRef, address, selectedShipping);
        navigateTo('order_success', { orderId: order.id });
      }, cartTotalKES);
    } else {
      // Pay on Delivery order (COD)
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const order = createOrderFromCart('cod', undefined, address, selectedShipping);
        showToast('Order Placed', 'Pay on Delivery order registered.', 'success');
        navigateTo('order_success', { orderId: order.id });
      }, 1000);
    }
  };

  // Selected shipping fee calculation
  const currentShippingObj =
    SHOPIFY_SHIPPING_METHODS.find((m) => m.id === selectedShipping) || SHOPIFY_SHIPPING_METHODS[0];
  const calculatedTotal = cartSubtotalKES + currentShippingObj.feeKES;

  return (
    <div className="pb-36 bg-zinc-50 min-h-screen">
      <HeaderBar title="Checkout" showSearch={false} showBack={true} />

      <form onSubmit={handlePlaceOrder} className="px-4 py-4 space-y-5 max-w-md mx-auto">
        {/* Contact & Shipping Address */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Delivery Destination
            </h3>
            <span className="text-[10px] text-zinc-400 font-medium">Kenyan Delivery</span>
          </div>

          <Card size="sm" variant="elevated" className="space-y-3 p-4 bg-white border border-zinc-200/90 rounded-2xl">
            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-1">
                Full Name
              </label>
              <Input size="sm" variant="outline">
                <InputField
                  type="text"
                  value={address.fullName}
                  onChange={(e) => handleAddressChange('fullName', e.target.value)}
                  placeholder="e.g. David Ochieng"
                  required
                />
              </Input>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Phone Number
                </label>
                <Input size="sm" variant="outline">
                  <InputField
                    type="tel"
                    value={address.phone}
                    onChange={(e) => handleAddressChange('phone', e.target.value)}
                    placeholder="+254 712 345 678"
                    required
                    className="font-mono"
                  />
                </Input>
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Email
                </label>
                <Input size="sm" variant="outline">
                  <InputField
                    type="email"
                    value={address.email}
                    onChange={(e) => handleAddressChange('email', e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </Input>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">County</label>
                <Input size="sm" variant="outline">
                  <InputField
                    type="text"
                    value={address.county}
                    onChange={(e) => handleAddressChange('county', e.target.value)}
                    placeholder="Nairobi"
                    required
                  />
                </Input>
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Town / Area
                </label>
                <Input size="sm" variant="outline">
                  <InputField
                    type="text"
                    value={address.townCity}
                    onChange={(e) => handleAddressChange('townCity', e.target.value)}
                    placeholder="Westlands"
                    required
                  />
                </Input>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-1">
                Estate, Street & House / Apartment
              </label>
              <Input size="sm" variant="outline">
                <InputField
                  type="text"
                  value={address.estateBuilding}
                  onChange={(e) => handleAddressChange('estateBuilding', e.target.value)}
                  placeholder="e.g. Rhapta Road, Apartment 4B"
                  required
                />
              </Input>
            </div>
          </Card>
        </div>

        {/* 1. Shipping Method (Matching Shopify Screenshot) */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-zinc-900 px-1">Shipping method</h3>

          <div className="bg-white rounded-2xl border-2 border-blue-500 overflow-hidden divide-y divide-zinc-200/80 shadow-xs">
            {SHOPIFY_SHIPPING_METHODS.map((method) => {
              const isSelected = selectedShipping === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => handleSelectShipping(method.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50/40' : 'hover:bg-zinc-50'
                  }`}
                >
                  <div className="mt-0.5 relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="shipping_method"
                      checked={isSelected}
                      onChange={() => handleSelectShipping(method.id)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-zinc-300 cursor-pointer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900">{method.label}</span>
                      <span className="text-xs font-mono font-bold text-zinc-900">
                        {formatKES(method.feeKES)}
                      </span>
                    </div>
                    {method.sublabel && (
                      <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                        {method.sublabel}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Payment (Matching Shopify Screenshot with Pesapal) */}
        <div className="space-y-2">
          <div className="px-1">
            <h3 className="text-sm font-bold text-zinc-900">Payment</h3>
            <p className="text-[11px] text-zinc-500">All transactions are secure and encrypted.</p>
          </div>

          <div className="space-y-2.5">
            {/* Pesapal Option */}
            <div
              onClick={() => setPaymentChoice('pesapal')}
              className={`bg-white rounded-2xl border-2 transition-all overflow-hidden cursor-pointer ${
                paymentChoice === 'pesapal'
                  ? 'border-blue-500 shadow-xs'
                  : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="payment_choice"
                    checked={paymentChoice === 'pesapal'}
                    onChange={() => setPaymentChoice('pesapal')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-zinc-300"
                  />
                  <span className="text-xs font-bold text-zinc-900">Pesapal</span>
                </div>

                {/* Card & Gateway Logos */}
                <div className="flex items-center gap-1">
                  <span className="bg-[#1A1F71] text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-tighter">
                    VISA
                  </span>
                  <span className="bg-[#EB001B] text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-tighter">
                    MC
                  </span>
                  <span className="bg-[#0070BA] text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-tighter">
                    AMEX
                  </span>
                  <span className="bg-zinc-100 text-zinc-600 text-[9px] font-bold px-1 py-0.5 rounded border border-zinc-200">
                    +3
                  </span>
                </div>
              </div>

              {/* Sub-panel when Pesapal selected */}
              {paymentChoice === 'pesapal' && (
                <div className="bg-zinc-50 px-4 py-3.5 border-t border-zinc-200/80 text-center animate-in fade-in-50">
                  <p className="text-xs text-zinc-600">
                    You&apos;ll be redirected to Pesapal to complete your purchase.
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-1 text-[10px] text-zinc-400">
                    <span>M-Pesa</span> • <span>Visa</span> • <span>Mastercard</span> •{' '}
                    <span>Airtel</span>
                  </div>
                </div>
              )}
            </div>

            {/* Pay on Delivery Option (If Pay on Delivery shipping method chosen) */}
            {selectedShipping === 'pay_on_delivery' && (
              <div
                onClick={() => setPaymentChoice('cod')}
                className={`bg-white rounded-2xl border-2 transition-all p-3.5 cursor-pointer ${
                  paymentChoice === 'cod'
                    ? 'border-blue-500 bg-blue-50/20'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentChoice === 'cod'}
                      onChange={() => setPaymentChoice('cod')}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-zinc-300"
                    />
                    <div>
                      <span className="text-xs font-bold text-zinc-900">Pay on Delivery</span>
                      <p className="text-[10px] text-zinc-500">
                        Pay via M-Pesa or Cash upon rider arrival
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Nairobi Only
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Billing Address (Matching Shopify Screenshot) */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-zinc-900 px-1">Billing address</h3>

          <div className="bg-white rounded-2xl border-2 border-zinc-200 overflow-hidden divide-y divide-zinc-200/80 shadow-xs">
            <div
              onClick={() => setBillingSame(true)}
              className={`p-3.5 flex items-center gap-3 cursor-pointer ${
                billingSame ? 'bg-blue-50/30' : 'hover:bg-zinc-50'
              }`}
            >
              <input
                type="radio"
                name="billing_option"
                checked={billingSame}
                onChange={() => setBillingSame(true)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-zinc-300 cursor-pointer"
              />
              <span className="text-xs font-semibold text-zinc-900">
                Same as shipping address
              </span>
            </div>

            <div
              onClick={() => setBillingSame(false)}
              className={`p-3.5 flex items-center gap-3 cursor-pointer ${
                !billingSame ? 'bg-blue-50/30' : 'hover:bg-zinc-50'
              }`}
            >
              <input
                type="radio"
                name="billing_option"
                checked={!billingSame}
                onChange={() => setBillingSame(false)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-zinc-300 cursor-pointer"
              />
              <span className="text-xs font-semibold text-zinc-900">
                Use a different billing address
              </span>
            </div>
          </div>

          {/* Expandable Custom Billing Inputs */}
          {!billingSame && (
            <Card size="sm" variant="elevated" className="p-3.5 bg-white border border-zinc-200 space-y-2.5 rounded-2xl animate-in fade-in-50">
              <span className="text-[11px] font-bold text-zinc-700 block">
                Billing Contact Details
              </span>
              <Input size="sm" variant="outline">
                <InputField
                  type="text"
                  value={customBilling.fullName}
                  onChange={(e) => handleCustomBillingChange('fullName', e.target.value)}
                  placeholder="Billing Full Name"
                  required={!billingSame}
                />
              </Input>
              <Input size="sm" variant="outline">
                <InputField
                  type="tel"
                  value={customBilling.phone}
                  onChange={(e) => handleCustomBillingChange('phone', e.target.value)}
                  placeholder="Billing Phone (+254...)"
                  required={!billingSame}
                />
              </Input>
              <Input size="sm" variant="outline">
                <InputField
                  type="text"
                  value={customBilling.estateBuilding}
                  onChange={(e) => handleCustomBillingChange('estateBuilding', e.target.value)}
                  placeholder="Billing Estate / Street Address"
                  required={!billingSame}
                />
              </Input>
            </Card>
          )}
        </div>

        {/* Sticky Action Button */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-4 py-3 shadow-lg">
          <div className="max-w-md mx-auto flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] text-zinc-500 font-medium">Total to Pay</div>
              <div className="text-base font-extrabold text-zinc-950 font-mono tracking-tight">
                {formatKES(calculatedTotal)}
              </div>
            </div>

            <Button
              id="confirm-pay-btn"
              type="submit"
              size="lg"
              variant="solid"
              action="primary"
              isLoading={isSubmitting}
              className="flex-1 bg-[#E6007E] hover:bg-[#C9006E] text-white"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {paymentChoice === 'pesapal' ? 'Pay with Pesapal' : 'Place COD Order'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
