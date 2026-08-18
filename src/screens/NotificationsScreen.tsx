import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  ChevronRight,
  Clock,
  Globe,
  Package,
  Plane,
  ShieldCheck,
  Sparkles,
  Tag,
  Trash2,
  Truck,
} from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { Badge, Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';
import { AppNotification } from '../types';

type NotificationTab = 'all' | 'order' | 'promo' | 'system';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, navigateTo, showToast } =
    useApp();
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'order':
        return <Package className="w-5 h-5 text-[#E6007E]" />;
      case 'promo':
        return <Tag className="w-5 h-5 text-amber-600" />;
      case 'system':
        return <ShieldCheck className="w-5 h-5 text-[#22C55E]" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleNotificationClick = (item: AppNotification) => {
    markNotificationAsRead(item.id);
    if (item.actionUrl) {
      if (item.actionUrl.startsWith('order/')) {
        navigateTo('orders');
      } else if (item.actionUrl === 'home' || item.actionUrl === 'search') {
        navigateTo(item.actionUrl as any);
      }
    }
  };

  return (
    <div className="pb-28 bg-zinc-50 min-h-screen">
      <HeaderBar title="Notifications" showBack showSearch={false} />

      <main className="px-4 py-3 space-y-3">
        {/* Top Controls & Mark All as Read */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {(['all', 'order', 'promo', 'system'] as NotificationTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {tab === 'all' ? 'All Alerts' : tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              markAllNotificationsAsRead();
              showToast('Notifications Marked', 'All alerts marked as read', 'success');
            }}
            className="text-[11px] font-bold text-[#E6007E] hover:underline flex items-center gap-1 shrink-0 ml-2"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark read</span>
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <Card size="md" variant="elevated" className="p-8 text-center bg-white border border-zinc-200 mt-4">
            <Bell className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
            <h3 className="text-xs font-bold text-zinc-800">No notifications in this category</h3>
            <p className="text-[11px] text-zinc-500 mt-1">
              You're all caught up with your Salibay order dispatches and promotions.
            </p>
          </Card>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((item) => (
              <Card
                key={item.id}
                size="sm"
                variant="elevated"
                className={`p-3.5 border transition-all cursor-pointer shadow-xs ${
                  item.read
                    ? 'bg-white border-zinc-200 opacity-80'
                    : 'bg-white border-pink-200 ring-1 ring-pink-100'
                }`}
                onClick={() => handleNotificationClick(item)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-2xl shrink-0 ${
                      item.type === 'order'
                        ? 'bg-pink-50'
                        : item.type === 'promo'
                        ? 'bg-amber-50'
                        : 'bg-emerald-50'
                    }`}
                  >
                    {getIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4
                        className={`text-xs leading-snug truncate ${
                          item.read ? 'font-semibold text-zinc-800' : 'font-black text-zinc-900'
                        }`}
                      >
                        {item.title}
                      </h4>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-[#E6007E] shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                      {item.message}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100/80">
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {item.timestamp}
                      </span>
                      {item.actionUrl && (
                        <span className="text-[10px] font-bold text-[#E6007E] flex items-center gap-0.5">
                          <span>View Details</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
