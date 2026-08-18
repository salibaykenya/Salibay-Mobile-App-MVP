import React, { createContext, useContext, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  onClose: () => {},
});

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {children}
      </div>
    </ModalContext.Provider>
  );
};

export const ModalBackdrop: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { onClose } = useContext(ModalContext);
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 ${className}`}
    />
  );
};

export const ModalContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ children, className = '', size = 'md' }) => {
  const maxWidth = {
    sm: 'max-w-xs',
    md: 'max-w-sm',
    lg: 'max-w-md',
  }[size];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative z-10 w-full ${maxWidth} bg-white rounded-3xl p-5 shadow-2xl border border-zinc-200 transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export const ModalHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between pb-3 border-b border-zinc-100 shrink-0 ${className}`}>
      {children}
    </div>
  );
};

export const ModalBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`flex-1 overflow-y-auto py-3 no-scrollbar ${className}`}>{children}</div>;
};

export const ModalFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 shrink-0 ${className}`}>
      {children}
    </div>
  );
};

export const ModalCloseButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { onClose } = useContext(ModalContext);
  return (
    <button
      onClick={onClose}
      className={`p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors ${className}`}
    >
      <X className="w-4 h-4" />
    </button>
  );
};
