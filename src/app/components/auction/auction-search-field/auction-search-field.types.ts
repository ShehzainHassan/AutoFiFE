import { Dispatch, SetStateAction } from "react";

export type SearchFieldProps = {
  width?: string;
  search?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
};
