import React from 'react';
import { LogOut, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button, Card, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from '../primitives';

export const SignOutConfirmModal: React.FC = () => {
  const { isSignOutModalOpen, setIsSignOutModalOpen, signOut } = useApp();

  if (!isSignOutModalOpen) return null;

  return (
    <Modal isOpen={isSignOutModalOpen} onClose={() => setIsSignOutModalOpen(false)}>
      <ModalBackdrop />
      <ModalContent className="max-w-xs mx-auto p-5 text-center">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <LogOut className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-zinc-900">Sign Out of Salibay?</h3>
        <p className="text-xs text-zinc-500 mt-1 mb-5">
          You will be switched to Guest Mode. Your cart and saved wishlist will remain available on this device.
        </p>

        <div className="space-y-2">
          <Button
            id="modal-confirm-signout-btn"
            variant="solid"
            action="negative"
            size="md"
            className="w-full justify-center bg-rose-600 hover:bg-rose-700 text-white font-bold"
            onPress={signOut}
          >
            Sign Out
          </Button>

          <Button
            id="modal-cancel-signout-btn"
            variant="outline"
            size="md"
            className="w-full justify-center border-zinc-200 text-zinc-700 hover:bg-zinc-100 font-semibold"
            onPress={() => setIsSignOutModalOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
