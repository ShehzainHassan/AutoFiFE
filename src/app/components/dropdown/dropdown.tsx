"use client";

import { Options } from "@/interfaces/dropdown-options";
import dynamic from "next/dynamic";
import { createContext, useContext } from "react";
import { GroupBase, Props as SelectProps } from "react-select";
import classes from "./dropdown.module.css";
import { DropdownContextType, DropdownProps, LabelProps, SelectComponentProps } from "./dropdown.types";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => <div className={classes.loading}>Loading...</div>,
});
const TypedSelect = Select as unknown as React.ComponentType<
  SelectProps<Options, false, GroupBase<Options>>
>;

const DropdownContext = createContext<DropdownContextType | null>(null);

export function Dropdown({
  value,
  onChange,
  placeholder,
  className,
  children,
}: DropdownProps) {
  return (
    <DropdownContext.Provider value={{ value, onChange, placeholder }}>
      <div className={`${classes.container} ${className ?? ""}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function Label({ children, className }: LabelProps) {
  return (
    <label className={`${classes.label} ${className ?? ""}`}>{children}</label>
  );
}

function SelectComponent({
  options,
  placeholder,
  className,
  styles,
  components,
}: SelectComponentProps) {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown.Select must be used inside a Dropdown");
  }

  const { value, onChange, placeholder: contextPlaceholder } = context;
  const selectPlaceholder = placeholder ?? contextPlaceholder;

  return (
    <TypedSelect
      className={`${classes.select} ${className ?? ""}`}
      options={options}
      placeholder={selectPlaceholder}
      value={options.find((opt) => opt.value === value)}
      onChange={(option) => onChange(option?.value || "")}
      styles={styles}
      components={components}
    />
  );
}

Dropdown.Label = Label;
Dropdown.Select = SelectComponent;

export default Dropdown;
