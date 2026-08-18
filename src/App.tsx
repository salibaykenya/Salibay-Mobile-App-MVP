import React from 'react';
import { MobileShell } from './components/layout/MobileShell';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <MobileShell />
    </AppProvider>
  );
}
