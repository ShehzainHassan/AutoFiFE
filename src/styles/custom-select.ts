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

export const grayedField: StylesConfig<Options, false> = {
  control: (base) => ({
    ...base,
    border: "1px solid var(--color-gray525)",
    boxShadow: "none",
    cursor: "pointer",
    width: "100%",
    color: "var(--color-blue250)",
    backgroundColor: "var(--color-gray560)",
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
