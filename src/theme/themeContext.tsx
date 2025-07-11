"use client";
import { createContext, useContext } from "react";
type ButtonPrimaryTheme = {
  backgroundColor: string;
  borderRadius: string;
  textColor: string;
  padding: string;
  hoverColor: string;
  hoverTextColor?: string;
  border: string;
};
type HorizontalTabsTheme = {
  tabColor: string;
  selectedTabColor: string;
  selectedTabBorderColor: string;
  borderColor: string;
};
type TextContainerTheme = {
  padding: string;
  width: string;
  borderRadius: string;
  fontWeight: number;
  fontSize: string;
};

export interface ThemeContextType {
  horizontalTabs?: HorizontalTabsTheme;
  buttonPrimary?: ButtonPrimaryTheme;
  textContainer?: TextContainerTheme;
}

const defaultTheme: ThemeContextType = {
  horizontalTabs: {
    tabColor: "var(--color-black100)",
    selectedTabColor: "var(--color-black100)",
    selectedTabBorderColor: "var(--color-blue500)",
    borderColor: "var(--color-gray100)",
  },
  buttonPrimary: {
    backgroundColor: "var(--color-white100)",
    borderRadius: "46px",
    textColor: "var(--color-black100)",
    padding: "10px 25px",
    hoverColor: "var(--color-white200)",
    border: "none",
  },
  textContainer: {
    padding: "14px 24px",
    width: "100px",
    borderRadius: "12px",
    fontWeight: 500,
    fontSize: "18px",
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
