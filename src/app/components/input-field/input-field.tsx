"use client";

import { ReactNode, ChangeEvent } from "react";
import classes from "./input-field.module.css";
type InputFieldProps = {
  type?: "text" | "number" | "email";
  placeholder?: string;
  value?: string | number;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

type InputProps = {
  width?: string;
  children: ReactNode;
};

export function Input({ width, children }: InputProps) {
  return (
    <div className={classes.container} style={{ width }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <label>{children}</label>;
}

function Field({
  type = "text",
  placeholder = "",
  value,
  onBlur,
  onChange,
  className,
}: InputFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
      onBlur={onBlur}
      className={`${classes.input} ${className}`}
    />
  );
}

Input.Label = Label;
Input.Field = Field;

export default Input;
