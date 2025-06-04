import { ChangeEvent, ReactNode } from "react";

export type InputFieldProps = {
  type?: "text" | "number" | "email";
  placeholder?: string;
  value?: string | number;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export type InputProps = {
  width?: string;
  children: ReactNode;
};
