import React, { useState } from 'react';
import { HelpCircle, Package, Search } from 'lucide-react';
import { OrderCard } from '../components/commerce/OrderCard';
import { HeaderBar } from '../components/layout/HeaderBar';
import { useApp } from '../context/AppContext';

export const OrdersScreen: React.FC = () => {
  const { orders, navigateTo } = useApp();
  const [tab, setTab] = useState<'active' | 'completed'>('active');

  const activeOrders = orders.filter((o) => o.status !== 'delivered');
  const completedOrders = orders.filter((o) => o.status === 'delivered');

  const displayedOrders = tab === 'active' ? activeOrders : completedOrders;

  return (
    <div className="pb-24 bg-zinc-50 min-h-screen">
      <HeaderBar title="My Orders" showSearch={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Tabs */}
        <div className="flex bg-zinc-200/70 p-1 rounded-2xl gap-1">
          <button
            onClick={() => setTab('active')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'active' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Active In-Transit ({activeOrders.length})
          </button>
          <button
            onClick={() => setTab('completed')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'completed' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Completed ({completedOrders.length})
          </button>
        </div>

        {/* Orders list */}
        {displayedOrders.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">
              No {tab === 'active' ? 'active shipments' : 'past orders'}
            </h3>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              {tab === 'active'
                ? 'Your new orders will appear here with live tracking checkpoints.'
                : 'Your delivered orders will be archived here.'}
            </p>
            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
