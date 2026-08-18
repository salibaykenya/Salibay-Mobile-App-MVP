import React from 'react';
import { Download, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button, Modal, ModalBackdrop, ModalContent } from '../primitives';

export const AppUpdateModal: React.FC = () => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, updateModalType, showToast } = useApp();

  if (!isUpdateModalOpen) return null;

  const isRequired = updateModalType === 'required';

  const handleUpdate = () => {
    setIsUpdateModalOpen(false);
    showToast('App Updated', 'You are now running Salibay Mobile v2.4.1 (Build KE-892)', 'success');
  };

  return (
    <Modal
      isOpen={isUpdateModalOpen}
      onClose={() => {
        if (!isRequired) setIsUpdateModalOpen(false);
      }}
    >
      <ModalBackdrop />
      <ModalContent className="max-w-xs mx-auto p-5 text-center">
        <div className="w-14 h-14 rounded-3xl bg-pink-50 text-[#E6007E] flex items-center justify-center mx-auto mb-4 ring-8 ring-pink-50/50">
          <Sparkles className="w-7 h-7" />
        </div>

        <h3 className="text-base font-bold text-zinc-900">
          {isRequired ? 'Critical Update Required' : 'New Version Available'}
        </h3>
        <p className="text-xs text-zinc-500 mt-1 mb-4">
          Version 2.4.1 is now ready with improved M-Pesa STK Push speed and live JKIA customs tracking updates.
        </p>

        <div className="space-y-2">
          <Button
            id="app-update-now-btn"
            variant="solid"
            action="primary"
            size="md"
            className="w-full justify-center bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold"
            onPress={handleUpdate}
          >
            <Download className="w-4 h-4 mr-1.5" />
            Update App Now
          </Button>

          {!isRequired && (
            <Button
              id="app-update-later-btn"
              variant="outline"
              size="sm"
              className="w-full justify-center border-zinc-200 text-zinc-600 hover:bg-zinc-100 text-xs font-semibold"
              onPress={() => setIsUpdateModalOpen(false)}
            >
              Later
            </Button>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};
