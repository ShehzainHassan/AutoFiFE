export interface AnalyticsStatsProps<T = unknown> {
  isLoading: boolean;
  data: T | null | undefined;
  getValues: (data: T) => { label: string; value: string | number }[];
  getChanges?: (data: T) => {
    label: string;
    change?: number;
    status?: string;
  }[];
}
