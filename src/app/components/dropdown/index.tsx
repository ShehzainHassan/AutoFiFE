"use client";

import dynamic from "next/dynamic";
import { Props as SelectProps, GroupBase } from "react-select";
import { createContext, useContext, ReactNode } from "react";
import classes from "./dropdown.module.css";
import { Options } from "@/interfaces/dropdown-options";

const Select = dynamic(() => import("react-select"), { ssr: false });
const TypedSelect = Select as unknown as React.ComponentType<
  SelectProps<Options, false, GroupBase<Options>>
>;

type DropdownContextType = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type DropdownProps = DropdownContextType & {
  children: ReactNode;
  className?: string;
};

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

type LabelProps = {
  children: ReactNode;
  className?: string;
};
function Label({ children, className }: LabelProps) {
  return (
    <label className={`${classes.label} ${className ?? ""}`}>{children}</label>
  );
}

type SelectComponentProps = {
  options: Options[];
  placeholder?: string;
  className?: string;
  styles?: SelectProps<Options, false>["styles"];
  components?: SelectProps<Options, false>["components"];
};

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
