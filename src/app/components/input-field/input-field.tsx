"use client";

import { ReactNode } from "react";
import classes from "./input-field.module.css";
import { InputFieldProps, InputProps } from "./input-field.types";

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
