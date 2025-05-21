export interface SearchParams {
  pageSize: number;
  offset: number;
  make: string;
  model: string | null;
  startPrice: number | null;
  endPrice: number | null;
  mileage: number | null;
  startYear: number;
  endYear: number;
  sortOrder: string | null;
  gearbox: string;
  selectedColor: string;
}
