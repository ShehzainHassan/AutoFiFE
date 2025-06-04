import { components, DropdownIndicatorProps, GroupBase } from "react-select";
import { Options } from "@/interfaces/dropdown-options";
import classes from "./dropdown-indicator.module.css";

export default function CustomDropdownIndicator(
  props: DropdownIndicatorProps<Options, false, GroupBase<Options>>
) {
  return (
    <components.DropdownIndicator {...props}>
      <div className={classes.expand} />
    </components.DropdownIndicator>
  );
}
