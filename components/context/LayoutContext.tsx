import React, { createContext, useContext, useState } from 'react';

// Define the context type
type LayoutContextType = {
  layout: 'horizontal' | 'vertical' | null;
  setLayout: (layout: 'horizontal' | 'vertical' | null) => void;
};

// Create the context
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// Provide the context to children
export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [layout, setLayout] = useState<'horizontal' | 'vertical' | null>('horizontal');

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Hook to use the layout context
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
