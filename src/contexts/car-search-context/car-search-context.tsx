"use client";

import { DEFAULT_MAKE, DEFAULT_MODEL, PAGE_SIZE } from "@/constants";
import { MAX_YEAR, MIN_YEAR } from "@/constants/years";
import { SearchParams } from "@/interfaces/search-params";
import { convertArrayToString, getPriceRange } from "@/utilities/utilities";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";
import {
  MainSearchState,
  StagedSearchState,
  CountsState,
  CarSearchContextType,
} from "./car-search-context.types";

const CarSearchContext = createContext<CarSearchContextType | undefined>(
  undefined
);

export const CarSearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryParams = useSearchParams();

  const make = queryParams.get("make") || DEFAULT_MAKE;
  const model = queryParams.get("model") || DEFAULT_MODEL;
  const price = queryParams.get("price") || "All_Prices";
  const status = queryParams.get("status") || "Any";
  const gearboxParam = queryParams.get("gearbox") || "Any";
  const colorsParam = queryParams.get("colors") || "Any";
  const startYear = Number(queryParams.get("startYear")) || MIN_YEAR;
  const endYear = Number(queryParams.get("endYear")) || MAX_YEAR;
  const { startPrice, endPrice } = getPriceRange(price);

  const selectedGearboxes =
    gearboxParam !== "Any"
      ? gearboxParam
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean)
      : [];

  const selectedColors =
    colorsParam !== "Any"
      ? colorsParam
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean)
      : [];

  const [mainSearch, setMainSearch] = useState<MainSearchState>({
    make,
    model,
    price,
    startPrice,
    endPrice,
    status,
    mileage: null,
    sortOrder: null,
    startYear,
    endYear,
    selectedGearboxes,
    selectedColors,
  });

  const [stagedSearch, setStagedSearch] = useState<StagedSearchState>({
    stagedMake: make,
    stagedModel: model,
    stagedStatus: status,
    stagedStartYear: MIN_YEAR,
    stagedEndYear: MAX_YEAR,
    stagedStartPrice: null,
    stagedEndPrice: null,
    stagedMileage: null,
    stagedGearboxes: [],
    stagedColors: [],
  });

  const [counts, setCounts] = useState<CountsState>({
    gearboxesCount: {},
    colorsCount: {},
  });

  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [allColors, setAllColors] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    pageSize: PAGE_SIZE,
    offset: 0,
    make: mainSearch.make,
    model: mainSearch.model,
    startPrice: mainSearch.startPrice,
    endPrice: mainSearch.endPrice,
    status: mainSearch.status,
    mileage: mainSearch.mileage,
    startYear: mainSearch.startYear,
    endYear: mainSearch.endYear,
    sortOrder: mainSearch.sortOrder,
    gearbox: convertArrayToString(mainSearch.selectedGearboxes),
    selectedColor: convertArrayToString(mainSearch.selectedColors),
  });

  return (
    <CarSearchContext.Provider
      value={{
        mainSearch,
        stagedSearch,
        counts,
        expandedSections,
        allColors,
        searchParams,
        setMainSearch,
        setStagedSearch,
        setCounts,
        setExpandedSections,
        setAllColors,
        setSearchParams,
      }}>
      {children}
    </CarSearchContext.Provider>
  );
};

export function useSearch() {
  const context = useContext(CarSearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a CarSearchProvider");
  }
  return context;
}
