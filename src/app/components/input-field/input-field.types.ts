import { ChangeEvent, ReactNode } from "react";

export type InputFieldProps = {
  type?: "text" | "number" | "email";
  placeholder?: string;
  value?: string | number;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  isDisabled?: boolean;
};

export type InputProps = {
  width?: string;
  children: ReactNode;
};
