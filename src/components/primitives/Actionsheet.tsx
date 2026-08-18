import React, { createContext, useContext, useEffect } from 'react';

interface ActionsheetContextValue {
  isOpen: boolean;
  onClose: () => void;
}

const ActionsheetContext = createContext<ActionsheetContextValue>({
  isOpen: false,
  onClose: () => {},
});

export interface ActionsheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Actionsheet: React.FC<ActionsheetProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ActionsheetContext.Provider value={{ isOpen, onClose }}>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {children}
      </div>
    </ActionsheetContext.Provider>
  );
};

export const ActionsheetBackdrop: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { onClose } = useContext(ActionsheetContext);
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 ${className}`}
    />
  );
};

export const ActionsheetContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative z-10 w-full max-w-lg bg-white rounded-t-3xl p-5 shadow-2xl border-t border-x border-zinc-200 animate-in slide-in-from-bottom duration-250 max-h-[85vh] flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export const ActionsheetDragIndicatorWrapper: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`flex items-center justify-center pb-3 cursor-grab ${className}`}>{children || <ActionsheetDragIndicator />}</div>;
};

export const ActionsheetDragIndicator: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`w-10 h-1 rounded-full bg-zinc-300 ${className}`} />;
};

export const ActionsheetItem: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`w-full p-3 rounded-xl hover:bg-zinc-100 flex items-center justify-between text-left transition-colors cursor-pointer text-xs font-semibold text-zinc-900 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ActionsheetItemText: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <span className={`text-inherit ${className}`}>{children}</span>;
};
