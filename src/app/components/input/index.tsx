"use client";

import { createContext, useContext, ReactNode, ChangeEvent } from "react";
import classes from "./input.module.css";

type InputContextType = {
  type?: "text" | "number";
  placeholder?: string;
  value: string | number | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  width?: string;
};

const InputContext = createContext<InputContextType | null>(null);

export function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  children,
  width,
}: {
  type?: "text" | "number";
  placeholder?: string;
  width?: string;
  value?: string | number | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}) {
  return (
    <InputContext.Provider
      value={{ type, placeholder, width, value, onChange }}>
      <div className={classes.container} style={{ width }}>
        {children}
      </div>
    </InputContext.Provider>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <label>{children}</label>;
}

function Field() {
  const context = useContext(InputContext);
  if (!context) throw new Error("Input.Field must be used inside <Input>");

  const { type, placeholder, value, onChange } = context;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={classes.input}
    />
  );
}

Input.Label = Label;
Input.Field = Field;

export default Input;
