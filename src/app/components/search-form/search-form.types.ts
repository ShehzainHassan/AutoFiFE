export type SearchFormContainerProps = {
  statusTab: string;
};
export type DropdownProps = {
  value: string;
  onChange: (val: string) => void;
  options?: { label: string; value: string }[];
};

export type SearchFormViewProps = {
  makeProps: DropdownProps;
  modelProps: DropdownProps;
  priceProps: DropdownProps;
  onSearch: () => void;
};
