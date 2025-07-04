import { ThemeContextType } from "@/theme/themeContext";

export const BLUE_THEME: ThemeContextType = {
  buttonPrimary: {
    backgroundColor: "var(--color-blue500)",
    borderRadius: "60px",
    textColor: "var(--color-white100)",
    padding: "12px 30px",
    hoverColor: "var(--color-blue600)",
    border: "none",
  },
};
export const WHITE_THEME: ThemeContextType = {
  buttonPrimary: {
    textColor: "var(--color-black100)",
    border: "1px solid var(--color-black100)",
    backgroundColor: "var(--color-white100)",
    borderRadius: "46px",
    padding: "10px 25px",
    hoverColor: "var(--color-white200)",
  },
};

export const WHITE_BLUE_THEME: ThemeContextType = {
  buttonPrimary: {
    backgroundColor: "var(--color-white500)",
    borderRadius: "60px",
    textColor: "var(--color-blue500)",
    padding: "12px 30px",
    hoverColor: "var(--color-blue600)",
    hoverTextColor: "var(--color-white100)",
    border: "none",
  },
};

export const WHITE_TRANSPARENT: ThemeContextType = {
  buttonPrimary: {
    backgroundColor: "var(--color-white100_opaque_20)",
    borderRadius: "12px",
    textColor: "var(--color-white100)",
    padding: "16px",
    hoverColor: "var(--color-blue600)",
    border: "none",
  },
};
export const RED_THEME: ThemeContextType = {
  buttonPrimary: {
    backgroundColor: "var(--color-red500)",
    borderRadius: "12px",
    textColor: "var(--color-white100)",
    padding: "16px",
    hoverColor: "var(--color-red800)",
    border: "none",
  },
};
