"use client";
import dynamic from "next/dynamic";
import { components, DropdownIndicatorProps, GroupBase } from "react-select";
import classes from "./dropdown-without-label.module.css";
const Select = dynamic(() => import("react-select"), { ssr: false });
const TypedSelect = Select as unknown as React.ComponentType<
  import("react-select").Props<Options, false, GroupBase<Options>>
>;

type Options = {
  label: string;
  value: string;
};

type DropwdownProps = {
  options: Options[];
  value: string;
  onChange: (option: string) => void;
  placeholder?: string;
};

const CustomDropdownIndicator = (
  props: DropdownIndicatorProps<Options, false, GroupBase<Options>>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <div className={classes.expand} />
    </components.DropdownIndicator>
  );
};
export default function DropdownWithoutLabel({
  options,
  value,
  onChange,
  placeholder = "Select...",
}: DropwdownProps) {
  return (
    <div className={classes.container}>
      <TypedSelect
        options={options}
        placeholder={placeholder}
        value={options.find((option) => option.value === value)}
        onChange={(option) => onChange(option?.value || "")}
        styles={{
          control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
            cursor: "pointer",
            width: "200px",
          }),
          menu: (base) => ({
            ...base,
            marginTop: 0,
            border: "none",
            boxShadow: "none",
          }),
          menuList: (base) => ({
            ...base,
            padding: 0,
          }),
        }}
        components={{
          DropdownIndicator: CustomDropdownIndicator,
        }}
      />
    </div>
  );
}
