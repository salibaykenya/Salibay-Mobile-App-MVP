import React from 'react';
import { Bell, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button, Modal, ModalBackdrop, ModalContent } from '../primitives';

export const NotificationPermissionModal: React.FC = () => {
  const { isNotificationModalOpen, setIsNotificationModalOpen, showToast } = useApp();

  if (!isNotificationModalOpen) return null;

  const handleEnable = () => {
    setIsNotificationModalOpen(false);
    showToast('Notifications Enabled', 'You will receive live JKIA customs and courier dispatch alerts.', 'success');
  };

  return (
    <Modal isOpen={isNotificationModalOpen} onClose={() => setIsNotificationModalOpen(false)}>
      <ModalBackdrop />
      <ModalContent className="max-w-sm mx-auto p-5 text-center">
        <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-[#E6007E]/20 to-pink-100 text-[#E6007E] flex items-center justify-center mx-auto mb-4 ring-8 ring-pink-50">
          <Bell className="w-7 h-7" />
        </div>

        <h3 className="text-base font-bold text-zinc-900">Never Miss a Delivery Update</h3>
        <p className="text-xs text-zinc-500 mt-1 mb-4">
          Turn on push notifications to receive real-time updates for:
        </p>

        <div className="space-y-2.5 text-left bg-zinc-50 rounded-2xl p-3.5 mb-5 border border-zinc-100">
          <div className="flex items-center gap-2.5 text-xs text-zinc-700">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span>Real-time courier dispatch & rider PIN</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-700">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span>JKIA Kenya customs clearance confirmations</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-700">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span>Exclusive Flash Sales & price drop alerts</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            id="enable-notifications-btn"
            variant="solid"
            action="primary"
            size="md"
            className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold"
            onPress={handleEnable}
          >
            Allow Notifications
          </Button>

          <Button
            id="dismiss-notifications-btn"
            variant="ghost"
            size="sm"
            className="w-full justify-center text-zinc-500 hover:text-zinc-800 text-xs font-semibold"
            onPress={() => setIsNotificationModalOpen(false)}
          >
            Maybe Later
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
