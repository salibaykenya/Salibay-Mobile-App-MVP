import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button, Input, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from '../primitives';

export const DeleteAccountModal: React.FC = () => {
  const { isDeleteAccountModalOpen, setIsDeleteAccountModalOpen, deleteAccount } = useApp();
  const [confirmText, setConfirmText] = useState('');

  if (!isDeleteAccountModalOpen) return null;

  const isConfirmed = confirmText.trim().toUpperCase() === 'DELETE';

  return (
    <Modal isOpen={isDeleteAccountModalOpen} onClose={() => setIsDeleteAccountModalOpen(false)}>
      <ModalBackdrop />
      <ModalContent className="max-w-sm mx-auto p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-rose-600">
            <div className="p-2 rounded-xl bg-rose-50">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Delete Salibay Account</h3>
          </div>
          <button
            onClick={() => setIsDeleteAccountModalOpen(false)}
            className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-zinc-600 leading-relaxed mb-3">
          This action will permanently delete your account profile, delivery addresses, and saved preferences. Historical completed orders will be archived for statutory tax and warranty compliance.
        </p>

        <div className="bg-rose-50/60 border border-rose-200/60 rounded-xl p-3 mb-4">
          <p className="text-[11px] font-medium text-rose-800">
            Type <span className="font-mono font-bold">DELETE</span> below to confirm account removal:
          </p>
          <input
            id="delete-account-confirm-input"
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE"
            className="mt-2 w-full px-3 py-2 text-xs bg-white rounded-lg border border-rose-300 focus:outline-hidden focus:ring-1 focus:ring-rose-500 font-mono"
          />
        </div>

        <div className="space-y-2">
          <Button
            id="modal-confirm-delete-account-btn"
            variant="solid"
            action="negative"
            size="md"
            isDisabled={!isConfirmed}
            className="w-full justify-center bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold"
            onPress={() => {
              deleteAccount();
              setConfirmText('');
            }}
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Permanently Delete My Account
          </Button>

          <Button
            id="modal-cancel-delete-account-btn"
            variant="outline"
            size="md"
            className="w-full justify-center border-zinc-200 text-zinc-700 hover:bg-zinc-100 font-semibold"
            onPress={() => {
              setIsDeleteAccountModalOpen(false);
              setConfirmText('');
            }}
          >
            Cancel & Keep Account
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
