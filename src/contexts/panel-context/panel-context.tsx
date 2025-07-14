"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type PanelType = "none" | "watchlist" | "notification";

type PanelContextType = {
  panel: PanelType;
  setPanel: (panel: PanelType) => void;
  togglePanel: (panel: PanelType) => void;
};

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export const PanelProvider = ({ children }: { children: ReactNode }) => {
  const [panel, setPanel] = useState<PanelType>("none");

  const togglePanel = (target: PanelType) => {
    setPanel((prev) => (prev === target ? "none" : target));
  };

  return (
    <PanelContext.Provider value={{ panel, setPanel, togglePanel }}>
      {children}
    </PanelContext.Provider>
  );
};

export const usePanel = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("usePanel must be used within a PanelProvider");
  }
  return context;
};
