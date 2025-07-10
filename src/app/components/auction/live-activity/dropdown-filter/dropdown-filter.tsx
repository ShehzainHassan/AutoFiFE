import { DropdownFilterProps } from "./dropdown-filter.types";
import classes from "./dropdown-filter.module.css";
import Dropdown from "@/assets/images/icons/next.png";
import Image from "next/image";
export default function DropdownFilter({ filter }: DropdownFilterProps) {
  return (
    <div className={classes.container}>
      <p>{filter}</p>
      <Image
        src={Dropdown}
        alt="dropdown"
        loading="lazy"
        width={20}
        height={20}
        className={classes.dropdown}
        placeholder="blur"
      />
    </div>
  );
}
