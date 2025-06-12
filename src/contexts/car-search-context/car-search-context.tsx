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
  const modelParam = queryParams.get("model") || "Any_Models";
  const priceParam = queryParams.get("price") || "All_Prices";
  const statusParam = queryParams.get("status") || "Any";
  const gearboxParam = queryParams.get("gearbox") || "Any";
  const colorsParam = queryParams.get("colors") || "Any";
  const startYearParam = Number(queryParams.get("startYear")) || MIN_YEAR;
  const endYearParam = Number(queryParams.get("endYear")) || MAX_YEAR;

  const { startPrice: priceStart, endPrice: priceEnd } =
    getPriceRange(priceParam);

  const [make, setMake] = useState(makeParam);
  const [model, setModel] = useState(modelParam);
  const [price, setPrice] = useState(priceParam);
  const [startPrice, setStartPrice] = useState<number | null>(priceStart);
  const [endPrice, setEndPrice] = useState<number | null>(priceEnd);
  const [status, setStatus] = useState<string>(statusParam);
  const [mileage, setMileage] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [startYear, setStartYear] = useState<number>(startYearParam);
  const [endYear, setEndYear] = useState<number>(endYearParam);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const [selectedGearboxes, setSelectedGearboxes] = useState<string[]>(
    gearboxParam !== "Any"
      ? gearboxParam
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean)
      : []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    colorsParam !== "Any"
      ? colorsParam
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean)
      : []
  );

  const [stagedStatus, setStagedStatus] = useState(statusParam);
  const [stagedStartYear, setStagedStartYear] = useState(MIN_YEAR);
  const [stagedEndYear, setStagedEndYear] = useState(MAX_YEAR);
  const [stagedStartPrice, setStagedStartPrice] = useState<number | null>(null);
  const [stagedEndPrice, setStagedEndPrice] = useState<number | null>(null);
  const [stagedMileage, setStagedMileage] = useState<number | null>(null);
  const [stagedGearboxes, setStagedGearboxes] = useState<string[]>([]);
  const [stagedColors, setStagedColors] = useState<string[]>([]);
  const [gearboxesCount, setGearboxesCount] = useState<Record<string, number>>(
    {}
  );
  const [colorsCount, setColorsCount] = useState<Record<string, number>>({});
  const [allColors, setAllColors] = useState<string[]>([]);
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
        gearboxesCount,
        stagedStatus,
        stagedStartYear,
        stagedEndYear,
        stagedStartPrice,
        stagedEndPrice,
        stagedMileage,
        stagedGearboxes,
        stagedColors,
        colorsCount,
        allColors,
        setAllColors,
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
        setStagedStatus,
        setStagedStartYear,
        setStagedEndYear,
        setStagedStartPrice,
        setStagedEndPrice,
        setStagedMileage,
        setStagedGearboxes,
        setStagedColors,
        setGearboxesCount,
        setColorsCount,
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
