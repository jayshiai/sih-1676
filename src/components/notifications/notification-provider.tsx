"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { type Mail } from "@/types/notification";

// Create a type for the context value
type ConfigContextType = {
  selected: Mail["id"] | null;
  setSelected: (id: Mail["id"] | null) => void;
};

// Create the context
const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// Create a provider component
export function ConfigProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Mail["id"] | null>(null);

  return (
    <ConfigContext.Provider value={{ selected, setSelected }}>
      {children}
    </ConfigContext.Provider>
  );
}

// Custom hook to use the ConfigContext
export function useMail() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useMail must be used within a ConfigProvider");
  }
  return context;
}
