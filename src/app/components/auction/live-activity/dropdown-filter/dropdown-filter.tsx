"use client";
import { useState } from "react";
import { DropdownFilterProps } from "./dropdown-filter.types";
import classes from "./dropdown-filter.module.css";
import DropdownIcon from "@/assets/images/icons/next.png";
import Image from "next/image";

export default function DropdownFilter({
  filter,
  selected,
  options,
  onSelect,
}: DropdownFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onSelect(option === "Any" ? null : option);
    setIsOpen(false);
  };

  return (
    <div className={`${classes.container} ${isOpen ? classes.noRound : ""} `}>
      <div
        className={classes.selected}
        onClick={() => setIsOpen((prev) => !prev)}>
        <p>{selected === null || selected === "Any" ? filter : selected}</p>{" "}
        <Image
          src={DropdownIcon}
          alt="dropdown"
          loading="lazy"
          width={15}
          height={15}
          className={classes.dropdown}
          placeholder="blur"
        />
      </div>

      {isOpen && (
        <div className={classes.dropdownList}>
          {options.map((option) => (
            <div
              key={option}
              className={classes.option}
              onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
