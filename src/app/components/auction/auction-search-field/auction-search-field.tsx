"use client";

import { useCallback } from "react";
import Image from "next/image";
import MaginfyIcon from "@/assets/images/icons/magnify.png";
import classes from "./auction-search-field.module.css";
import { SearchFieldProps } from "./auction-search-field.types";
import Input from "../../input-field";

export default function SearchField({
  width = "120px",
  search,
  setSearch,
}: SearchFieldProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch?.(e.target.value);
    },
    [setSearch]
  );

  return (
    <div className={classes.searchFieldContainer} role="search">
      <div className={classes.magnify} aria-hidden="true">
        <Image src={MaginfyIcon} alt="" width={24} height={24} />
      </div>
      <Input width={width}>
        <Input.Field
          type="text"
          placeholder="Search auctions"
          value={search}
          onChange={handleChange}
          className={classes.searchField}
          aria-label="Search auctions"
        />
      </Input>
    </div>
  );
}
