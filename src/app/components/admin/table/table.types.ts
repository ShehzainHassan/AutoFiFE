export interface AnalyticsTableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
}
