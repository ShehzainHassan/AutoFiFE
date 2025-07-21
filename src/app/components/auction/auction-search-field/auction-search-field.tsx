import MaginfyIcon from "@/assets/images/icons/magnify.png";
import { Input } from "../../input-field";
import classes from "./auction-search-field.module.css";
import { SearchFieldProps } from "./auction-search-field.types";
import Image from "next/image";
export default function SearchField({
  width = "120px",
  search,
  setSearch,
}: SearchFieldProps) {
  return (
    <div className={classes.searchFieldContainer}>
      <div className={classes.magnify}>
        <Image src={MaginfyIcon} alt="magify-icon" width={24} height={24} />
      </div>
      <Input width={width}>
        <Input.Field
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch?.(e.target.value)}
          className={classes.searchField}
        />
      </Input>
    </div>
  );
}
