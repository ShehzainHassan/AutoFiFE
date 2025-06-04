"use client";

import { PAGE_SIZE } from "@/constants";
import { MAX_YEAR, MIN_YEAR } from "@/constants/years";
import { SearchParams } from "@/interfaces/search-params";
import { convertArrayToString, getPriceRange } from "@/utilities/utilities";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { CarSearchContextType } from "./car-search-context.types";

const CarSearchContext = createContext<CarSearchContextType | undefined>(
  undefined
);
export const CarSearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryParams = useSearchParams();
  const makeParam = queryParams.get("make") || "Any_Makes";
  const statusParam = queryParams.get("status") || "Any";
  const modelParam = queryParams.get("model") || "Any_Models";
  const priceParam = queryParams.get("price") || "All_Prices";
  const startYearParam = Number(queryParams.get("startYear")) || MIN_YEAR;
  const endYearParam = Number(queryParams.get("endYear")) || MAX_YEAR;
  const { startPrice: priceStart, endPrice: priceEnd } =
    getPriceRange(priceParam);
  const [make, setMake] = useState(makeParam);
  const [model, setModel] = useState(modelParam);
  const [price, setPrice] = useState(priceParam);
  const [startPrice, setStartPrice] = useState<number | null>(priceStart);
  const [endPrice, setEndPrice] = useState<number | null>(priceEnd);
  const [mileage, setMileage] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [status, setStatus] = useState<string>(statusParam);
  const [startYear, setStartYear] = useState<number>(startYearParam);
  const [endYear, setEndYear] = useState<number>(endYearParam);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const gearboxParam = queryParams.get("gearbox") ?? "Any";
  const colorsParam = queryParams.get("colors") ?? "Any";

  const [selectedGearboxes, setSelectedGearboxes] = useState<string[]>(() => {
    if (gearboxParam && gearboxParam !== "Any") {
      return gearboxParam
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);
    }

    return [];
  });
  const [selectedColors, setSelectedColors] = useState<string[]>(() => {
    if (colorsParam && colorsParam !== "Any") {
      return colorsParam
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);
    }
    return [];
  });

  const [searchParams, setSearchParams] = useState<SearchParams>({
    pageSize: PAGE_SIZE,
    offset: 0,
    make,
    model,
    startPrice,
    endPrice,
    status,
    mileage,
    startYear,
    endYear,
    sortOrder,
    gearbox: convertArrayToString(selectedGearboxes),
    selectedColor: convertArrayToString(selectedColors),
  });
  return (
    <CarSearchContext.Provider
      value={{
        make,
        model,
        price,
        startPrice,
        endPrice,
        status,
        mileage,
        sortOrder,
        startYear,
        endYear,
        expandedSections,
        selectedGearboxes,
        selectedColors,
        searchParams,
        setMake,
        setModel,
        setPrice,
        setStartPrice,
        setEndPrice,
        setStatus,
        setMileage,
        setSortOrder,
        setSearchParams,
        setStartYear,
        setEndYear,
        setExpandedSections,
        setSelectedGearboxes,
        setSelectedColors,
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
