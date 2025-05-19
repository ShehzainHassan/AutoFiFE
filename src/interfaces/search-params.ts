export interface SearchParams {
  pageSize: number;
  offset: number;
  make: string;
  model: string | null;
  startPrice: number | null;
  endPrice: number | null;
}
