"use client";
import headings from "@/styles/typography.module.css";
import classes from "./dropdown.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const Select = dynamic(() => import("react-select"), { ssr: false });

type Options = {
  label: string;
  value: string;
};

type DropwdownProps = {
  label: string;
  options: Options[];
  placeholder?: string;
};

export default function DropdownWithLabel({
  label,
  options,
  placeholder = "Select...",
}: DropwdownProps) {
  const [selected, setSelected] = useState<Options | null>(null);

  return (
    <div className={classes.container}>
      <div className={`${headings.carDescription} ${classes.black}`}>
        {label}
      </div>
      <Select
        options={options}
        placeholder={placeholder}
        value={selected}
        onChange={(option) => setSelected(option as Options)}
      />
    </div>
  );
}
