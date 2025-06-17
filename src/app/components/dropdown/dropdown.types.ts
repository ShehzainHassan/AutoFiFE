import { Options } from "@/interfaces/dropdown-options";
import { ReactNode } from "react";
import { Props as SelectProps } from "react-select";

export type DropdownContextType = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export type DropdownProps = DropdownContextType & {
  children: ReactNode;
  className?: string;
};

export type LabelProps = {
  children: ReactNode;
  className?: string;
};

export type SelectComponentProps = {
  options: Options[];
  placeholder?: string;
  className?: string;
  styles?: SelectProps<Options, false>["styles"];
  components?: SelectProps<Options, false>["components"];
  showDropdownIndicator?: boolean;
};
