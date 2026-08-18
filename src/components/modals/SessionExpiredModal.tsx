import React from 'react';
import { Lock, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button, Modal, ModalBackdrop, ModalContent } from '../primitives';

export const SessionExpiredModal: React.FC = () => {
  const { isSessionExpiredOpen, setIsSessionExpiredOpen, navigateTo } = useApp();

  if (!isSessionExpiredOpen) return null;

  return (
    <Modal isOpen={isSessionExpiredOpen} onClose={() => setIsSessionExpiredOpen(false)}>
      <ModalBackdrop />
      <ModalContent className="max-w-xs mx-auto p-5 text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-zinc-900">Session Expired</h3>
        <p className="text-xs text-zinc-500 mt-1 mb-5">
          For your security and M-Pesa account protection, your session has timed out. Please sign in again to continue.
        </p>

        <div className="space-y-2">
          <Button
            id="session-relogin-btn"
            variant="solid"
            action="primary"
            size="md"
            className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold"
            onPress={() => {
              setIsSessionExpiredOpen(false);
              navigateTo('sign_in');
            }}
          >
            <Lock className="w-4 h-4 mr-1.5" />
            Sign In Again
          </Button>

          <Button
            id="session-continue-guest-btn"
            variant="outline"
            size="md"
            className="w-full justify-center border-zinc-200 text-zinc-700 hover:bg-zinc-100 font-semibold"
            onPress={() => {
              setIsSessionExpiredOpen(false);
              navigateTo('home');
            }}
          >
            Continue as Guest
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
