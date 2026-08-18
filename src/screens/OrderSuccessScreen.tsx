import React from 'react';
import { ArrowRight, CheckCircle2, Download, Home, Package, ShieldCheck, Truck } from 'lucide-react';
import { SalibayLogo } from '../components/common/SalibayLogo';
import { useApp } from '../context/AppContext';
import { formatKES } from '../utils/formatters';

export const OrderSuccessScreen: React.FC = () => {
  const { selectedOrder, navigateTo } = useApp();

  const order = selectedOrder;

  return (
    <div className="pb-24 bg-zinc-50 min-h-screen">
      <main className="px-4 py-8 max-w-md mx-auto space-y-5">
        {/* Success Header Box */}
        <div className="bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-xs text-center space-y-3">
          <div className="flex justify-center pb-1">
            <SalibayLogo variant="full" size="md" />
          </div>

          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E6007E] bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200">
              Payment Confirmed & Protected
            </span>
            <h1 className="text-lg font-black text-zinc-950 mt-2">Order Successfully Placed!</h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Thank you for shopping on Salibay Kenya.
            </p>
          </div>

          {/* Receipt Pill */}
          <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200/70 text-xs space-y-1">
            <div className="flex justify-between text-zinc-500">
              <span>Order Number:</span>
              <strong className="text-zinc-900 font-mono">{order.orderNumber}</strong>
            </div>
            {order.mpesaReceiptNumber && (
              <div className="flex justify-between text-zinc-500">
                <span>M-Pesa Reference:</span>
                <strong className="text-[#22C55E] font-mono font-bold">{order.mpesaReceiptNumber}</strong>
              </div>
            )}
            <div className="flex justify-between text-zinc-500">
              <span>Estimated Delivery:</span>
              <strong className="text-zinc-900">{order.estimatedDelivery}</strong>
            </div>
          </div>
        </div>

        {/* Destination & Tracking Summary */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <span className="font-bold text-zinc-900 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-zinc-700" />
              Delivery Destination
            </span>
            <span className="text-zinc-400 font-mono text-[10px]">
              {order.shippingAddress.county}
            </span>
          </div>

          <div className="text-zinc-600 leading-relaxed">
            <p className="font-semibold text-zinc-900">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.estateBuilding}</p>
            <p className="font-mono text-zinc-500">{order.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            id="track-order-success-btn"
            onClick={() => navigateTo('order_tracking', { orderId: order.id })}
            className="w-full py-3.5 bg-[#E6007E] hover:bg-[#d00072] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Package className="w-4 h-4" />
            <span>Track Order & Live Logistics</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="w-full py-3 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </main>
    </div>
  );
};
