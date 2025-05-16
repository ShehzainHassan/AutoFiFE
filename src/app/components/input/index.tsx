"use client";

import { createContext, useContext, ReactNode, ChangeEvent } from "react";
import classes from "./input.module.css";

type InputContextType = {
  value: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputContext = createContext<InputContextType | null>(null);

export function Input({
  value = 0,
  onChange,
  children,
}: {
  value?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}) {
  return (
    <InputContext.Provider value={{ value, onChange }}>
      <div className={classes.container}>{children}</div>
    </InputContext.Provider>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <label>{children}</label>;
}

function Field() {
  const context = useContext(InputContext);
  if (!context) throw new Error("Input.Field must be used inside <Input>");

  const { value, onChange } = context;

  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      className={classes.input}
    />
  );
}

Input.Label = Label;
Input.Field = Field;

export default Input;
