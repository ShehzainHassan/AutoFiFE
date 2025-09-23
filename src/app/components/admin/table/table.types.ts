export interface AnalyticsTableProps<T> {
  columns: {
    key: keyof T;
    label: string;
    width?: string;
    cellClass?: string;
  }[];
  data: T[];
  maxHeight?: string;
  onScrollEnd?: () => void;
}
