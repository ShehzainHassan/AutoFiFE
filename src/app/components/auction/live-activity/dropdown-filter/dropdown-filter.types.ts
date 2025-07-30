export interface DropdownFilterProps {
  filter: string;
  selected: string | null;
  options: string[];
  onSelect: (value: string | null) => void;
}
