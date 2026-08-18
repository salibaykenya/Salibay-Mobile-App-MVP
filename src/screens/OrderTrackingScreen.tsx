import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { OrderTimeline } from '../components/commerce/OrderTimeline';
import { HeaderBar } from '../components/layout/HeaderBar';
import { useApp } from '../context/AppContext';
import { formatKES } from '../utils/formatters';

export const OrderTrackingScreen: React.FC = () => {
  const { selectedOrder, goBack, showToast } = useApp();

  const order = selectedOrder;
  const isInternational = order.originType === 'international';

  const handleCallDriver = () => {
    showToast('Connecting Courier', 'Calling Salibay Delivery Dispatcher...', 'info');
  };

  const handleSupport = () => {
    showToast('Customer Support', 'Opening Salibay Kenya WhatsApp Concierge...', 'info');
  };

  return (
    <div className="pb-24 bg-zinc-50 min-h-screen">
      <HeaderBar title={`Track #${order.orderNumber}`} showSearch={false} showBack={true} />

      <main className="px-4 py-4 space-y-4">
        {/* Top Status Card with Visual Route */}
        <div className="bg-zinc-900 text-white p-5 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              {isInternational ? 'Global Air Cargo' : 'Local 24H Courier'}
            </span>
            <span className="text-xs font-mono text-zinc-400">{order.trackingNumber}</span>
          </div>

          <div>
            <h2 className="text-base font-extrabold text-white">
              {order.status === 'nairobi_hub'
                ? 'Sorted at Nairobi Westlands Hub'
                : order.status === 'delivered'
                ? 'Package Delivered Successfully'
                : 'In Transit to Your Doorstep'}
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Estimated Delivery: <strong className="text-white">{order.estimatedDelivery}</strong>
            </p>
          </div>

          {/* Visual Route Nodes */}
          <div className="p-3 bg-zinc-800/80 rounded-2xl border border-zinc-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <div className="flex items-center gap-1.5 font-bold">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{isInternational ? 'USA Hub' : 'Nairobi Hub'}</span>
              </div>

              <div className="flex-1 mx-3 border-t-2 border-dashed border-zinc-600 flex justify-center items-center relative">
                {isInternational ? (
                  <Plane className="w-4 h-4 text-emerald-400 bg-zinc-900 px-0.5 absolute" />
                ) : (
                  <Truck className="w-4 h-4 text-emerald-400 bg-zinc-900 px-0.5 absolute" />
                )}
              </div>

              <div className="flex items-center gap-1.5 font-bold text-white">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{order.shippingAddress.townCity}</span>
              </div>
            </div>
            <div className="text-[10px] text-zinc-400 flex justify-between">
              <span>Origin Confirmed</span>
              <span>Last-Mile Dispatch</span>
            </div>
          </div>
        </div>

        {/* Driver / Courier Card */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900">{order.courier}</div>
              <div className="text-[10px] text-zinc-500">Assigned Driver: Kevin Kipchumba</div>
            </div>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={handleCallDriver}
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 transition-colors"
              title="Call driver"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={handleSupport}
              className="p-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
              title="Chat support"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Detailed Timeline */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Logistics Activity History
          </h3>
          <OrderTimeline events={order.timeline} />
        </div>

        {/* Shipment Items Preview */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3 text-xs">
          <h3 className="font-bold uppercase tracking-wider text-zinc-400 text-[11px]">
            Items in this Package
          </h3>

          <div className="divide-y divide-zinc-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center gap-3 first:pt-0">
                <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 overflow-hidden shrink-0">
                  <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-zinc-900 line-clamp-1">{item.product.title}</h4>
                  <p className="text-[11px] text-zinc-500 font-mono">
                    Qty: {item.quantity} • {formatKES(item.itemTotalKES)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-100 flex justify-between font-bold text-zinc-900">
            <span>Total Order Amount</span>
            <span className="font-mono">{formatKES(order.totalKES)}</span>
          </div>
        </div>
      </main>
    </div>
  );
};
