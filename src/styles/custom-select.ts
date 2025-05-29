import { StylesConfig } from "react-select";
import { Options } from "@/interfaces/dropdown-options";

export const customSelectStyles: StylesConfig<Options, false> = {
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
};

export const contactDropdownStyle: StylesConfig<Options, false> = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    cursor: "pointer",
    width: "250px",
  }),
  menu: (base) => ({
    ...base,
    marginTop: 0,
    border: "1px solid var(--color-gray525)",
    boxShadow: "none",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
};
