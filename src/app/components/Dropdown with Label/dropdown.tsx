"use client";
import headings from "@/styles/typography.module.css";
import dynamic from "next/dynamic";
import { GroupBase } from "react-select";
import classes from "./dropdown.module.css";

const Select = dynamic(() => import("react-select"), { ssr: false });
const TypedSelect = Select as unknown as React.ComponentType<
  import("react-select").Props<Options, false, GroupBase<Options>>
>;

type Options = {
  label: string;
  value: string;
};

type DropwdownProps = {
  label: string;
  value: string;
  options: Options[];
  onChange: (option: string) => void;
  placeholder?: string;
};

export default function DropdownWithLabel({
  label,
  options,
  placeholder = "Select...",
  value,
  onChange,
}: DropwdownProps) {
  return (
    <div className={classes.container}>
      <div className={`${headings.carDescription} ${classes.black}`}>
        {label}
      </div>
      <TypedSelect
        options={options}
        placeholder={placeholder}
        value={options.find((option) => option.value === value)}
        onChange={(option) => onChange(option?.value || "")}
      />
    </div>
  );
}
