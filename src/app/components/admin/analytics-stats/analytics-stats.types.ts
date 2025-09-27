export interface AnalyticsStatsProps<T = unknown> {
  isLoading: boolean;
  data: T | null | undefined;
  getItems: (data: T) => {
    label: string;
    value: string | number;
    change?: number;
    status?: string;
  }[];
}
