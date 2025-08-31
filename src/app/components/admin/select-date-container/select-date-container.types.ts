export interface SelectedDateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

export interface SelectDateProps {
  range: SelectedDateRange[];
  setRange: (range: SelectedDateRange[]) => void;
  onClose: () => void;
}
