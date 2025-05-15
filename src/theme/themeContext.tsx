"use client";
import { createContext, useContext } from "react";

type HorizontalTabsTheme = {
  tabColor: string;
  selectedTabColor: string;
  selectedTabBorderColor: string;
  borderColor: string;
};

interface ThemeContextType {
  horizontalTabs: HorizontalTabsTheme;
}

const defaultTheme: ThemeContextType = {
  horizontalTabs: {
    tabColor: "var(--color-black100)",
    selectedTabColor: "var(--color-black100)",
    selectedTabBorderColor: "var(--color-blue500)",
    borderColor: "var(--color-gray100)",
  },
};


const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({
  children,
  value = defaultTheme,
}: {
  children: React.ReactNode;
  value?: ThemeContextType;
}) => {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
