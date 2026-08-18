import React, { createContext, useContext } from 'react';

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue>({
  value: '',
  onChange: () => {},
});

export interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ value, onChange, children, className = '' }) => {
  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div className={`flex flex-col ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`flex bg-zinc-200/70 p-1 rounded-2xl gap-1 ${className}`}>
      {children}
    </div>
  );
};

export const Tab: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className = '' }) => {
  const { value: activeValue, onChange } = useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <button
      onClick={() => onChange(value)}
      className={`flex-1 py-2 px-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer select-none ${
        isActive
          ? 'bg-white text-[#E6007E] shadow-xs'
          : 'text-zinc-600 hover:text-zinc-900'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const TabPanels: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`mt-3 ${className}`}>{children}</div>;
};

export const TabPanel: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className = '' }) => {
  const { value: activeValue } = useContext(TabsContext);
  if (activeValue !== value) return null;
  return <div className={`animate-in fade-in duration-150 ${className}`}>{children}</div>;
};
