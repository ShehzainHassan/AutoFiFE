"use client";

import { PAGE_SIZE } from "@/constants";
import { SearchParams } from "@/interfaces/search-params";
import { getPriceRange } from "@/utilities/utilities";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

type CarSearchContextType = {
  make: string;
  model: string;
  price: string;
  startPrice: number | null;
  endPrice: number | null;
  searchParams: SearchParams;
  setMake: (value: string) => void;
  setModel: (value: string) => void;
  setPrice: (value: string) => void;
  setStartPrice: (value: number | null) => void;
  setEndPrice: (value: number | null) => void;
  setSearchParams: (value: SearchParams) => void;
};

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
  const { startPrice: priceStart, endPrice: priceEnd } =
    getPriceRange(priceParam);
  const [make, setMake] = useState(makeParam);
  const [model, setModel] = useState(modelParam);
  const [price, setPrice] = useState(priceParam);
  const [startPrice, setStartPrice] = useState<number | null>(priceStart);
  const [endPrice, setEndPrice] = useState<number | null>(priceEnd);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    pageSize: PAGE_SIZE,
    offset: 0,
    make,
    model,
    startPrice,
    endPrice,
  });
  return (
    <CarSearchContext.Provider
      value={{
        make,
        model,
        price,
        startPrice,
        endPrice,
        searchParams,
        setMake,
        setModel,
        setPrice,
        setStartPrice,
        setEndPrice,
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
