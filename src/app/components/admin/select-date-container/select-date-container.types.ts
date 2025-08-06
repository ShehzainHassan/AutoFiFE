export type SelectedDateRange = {
  startDate: Date;
  endDate: Date;
  key: string;
};
export type SelectDateProps = {
  range: SelectedDateRange[];
  setRange: (range: SelectedDateRange[]) => void;
  onClose: () => void;
};
