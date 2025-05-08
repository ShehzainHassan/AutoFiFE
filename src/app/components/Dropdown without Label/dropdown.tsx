"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import classes from "./dropdown.module.css";
import { components, DropdownIndicatorProps, GroupBase } from "react-select";
const Select = dynamic(() => import("react-select"), { ssr: false });
const TypedSelect = Select as unknown as React.ComponentType<
  import("react-select").Props<Options, false, GroupBase<Options>>
>;

type Options = {
  value: string;
};

type DropwdownProps = {
  options: Options[];
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
  placeholder = "Select...",
}: DropwdownProps) {
  const [selected, setSelected] = useState<Options | null>(options[0] || null);

  return (
    <div className={classes.container}>
      <TypedSelect
        options={options}
        placeholder={placeholder}
        value={selected}
        onChange={(option) => setSelected(option as Options)}
        isSearchable={false}
        styles={{
          control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
            cursor: "pointer",
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
