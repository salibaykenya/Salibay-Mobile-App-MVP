import React from 'react';
import { ArrowRight, ChevronRight, Package, Truck } from 'lucide-react';
import { Badge, BadgeText, Card, Pressable } from '../primitives';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { formatKES } from '../../utils/formatters';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { navigateTo } = useApp();

  const handleTrackClick = () => {
    navigateTo('order_tracking', { orderId: order.id });
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return (
          <Badge variant="subtle" action="success" size="sm">
            <BadgeText>Delivered</BadgeText>
          </Badge>
        );
      case 'out_for_delivery':
        return (
          <Badge variant="subtle" action="info" size="sm">
            <BadgeText>Out for Delivery</BadgeText>
          </Badge>
        );
      case 'nairobi_hub':
        return (
          <Badge variant="subtle" action="primary" size="sm">
            <BadgeText>At Nairobi Hub</BadgeText>
          </Badge>
        );
      case 'customs_cleared':
        return (
          <Badge variant="subtle" action="warning" size="sm">
            <BadgeText>Customs Cleared</BadgeText>
          </Badge>
        );
      default:
        return (
          <Badge variant="subtle" action="muted" size="sm">
            <BadgeText>In Transit</BadgeText>
          </Badge>
        );
    }
  };

  return (
    <Card
      id={`order-card-${order.id}`}
      size="sm"
      variant="elevated"
      onClick={handleTrackClick}
      className="cursor-pointer hover:border-zinc-300 transition-all space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
        <div>
          <span className="font-mono text-xs font-bold text-zinc-900">{order.orderNumber}</span>
          <span className="text-[11px] text-zinc-400 ml-2">{order.date}</span>
        </div>
        {getStatusBadge(order.status)}
      </div>

      {/* Item summary */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-zinc-50 border border-zinc-100 overflow-hidden shrink-0">
          <img
            src={order.items[0]?.product.images[0]}
            alt={order.items[0]?.product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-semibold text-zinc-900 line-clamp-1">
            {order.items[0]?.product.title}
          </h4>
          <p className="text-[11px] text-zinc-500">
            {order.items.length > 1 ? `+ ${order.items.length - 1} more items • ` : ''}
            Total: <strong className="text-zinc-900 font-mono">{formatKES(order.totalKES)}</strong>
          </p>
          <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
            Est: {order.estimatedDelivery}
          </p>
        </div>

        <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
      </div>

      {/* Footer Track CTA */}
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
        <span className="text-[10px] text-zinc-400 font-mono">
          Ref: {order.mpesaReceiptNumber || 'CARD-OK'}
        </span>
        <button
          onClick={handleTrackClick}
          className="font-bold text-[#E6007E] hover:text-[#d00072] flex items-center gap-1 text-[11px] cursor-pointer"
        >
          <span>Live Tracking</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </Card>
  );
};
