import { SelectedDateRange } from "../select-date-container/select-date-container.types";

export interface AnalyticsLayoutProps {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  selectedRange: SelectedDateRange[];
  setSelectedRange: (range: SelectedDateRange[]) => void;
  onDateSubmit: () => void;
  dropdown?: React.ReactNode;
}
