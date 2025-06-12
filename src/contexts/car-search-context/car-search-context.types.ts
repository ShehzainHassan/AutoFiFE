import { SearchParams } from "@/interfaces/search-params";
export type MainSearchState = {
  make: string;
  model: string;
  price: string;
  startPrice: number | null;
  endPrice: number | null;
  status: string;
  mileage: number | null;
  sortOrder: string | null;
  startYear: number;
  endYear: number;
  selectedGearboxes: string[];
  selectedColors: string[];
};

export type StagedSearchState = {
  stagedMake: string;
  stagedModel: string;
  stagedStatus: string;
  stagedStartYear: number;
  stagedEndYear: number;
  stagedStartPrice: number | null;
  stagedEndPrice: number | null;
  stagedMileage: number | null;
  stagedGearboxes: string[];
  stagedColors: string[];
};

export type CountsState = {
  gearboxesCount: Record<string, number>;
  colorsCount: Record<string, number>;
};

export type CarSearchContextType = {
  mainSearch: MainSearchState;
  stagedSearch: StagedSearchState;
  counts: CountsState;
  expandedSections: Set<string>;
  allColors: string[];
  searchParams: SearchParams;
  setMainSearch: React.Dispatch<React.SetStateAction<MainSearchState>>;
  setStagedSearch: React.Dispatch<React.SetStateAction<StagedSearchState>>;
  setCounts: React.Dispatch<React.SetStateAction<CountsState>>;
  setExpandedSections: (value: Set<string>) => void;
  setAllColors: (value: string[]) => void;
  setSearchParams: (value: SearchParams) => void;
};
