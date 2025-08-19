export type DropdownProps = {
  value: string;
  onChange: (val: string) => void;
  options?: { label: string; value: string }[];
};

export interface SearchFormProps {
  statusTab: string;
}

export interface SearchFormViewProps {
  makeProps: DropdownProps;
  modelProps: DropdownProps;
  priceProps: DropdownProps;
  onSearch: () => void;
}
