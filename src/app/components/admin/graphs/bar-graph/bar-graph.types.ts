export type ChartData = {
  category: string;
  value: number;
  action?: React.ReactNode;
};

export type MyData = {
  payload: {
    category: string;
    value: number;
  };
};
export type BarGraphProps = {
  data: ChartData[];
  viewReport?: React.ReactNode;
};
