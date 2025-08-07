type DataPoint = {
  label: string;
  value: number;
};

type PeriodOption = {
  label: string;
  value: string;
};

export type AreaGraphProps = {
  title: string;
  data: DataPoint[];
  period: string;
  setPeriod: (period: string) => void;
  periodOptions: PeriodOption[];
  pecentageChange?: React.ReactNode;
  isLoading?: boolean;
};
