"use client";

import { getPriceRange } from "@/utilities/utilities";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

type CarSearchContextType = {
  make: string;
  model: string;
  price: string;
  startPrice: number | null;
  endPrice: number | null;
  setMake: (value: string) => void;
  setModel: (value: string) => void;
  setPrice: (value: string) => void;
  setStartPrice: (value: number | null) => void;
  setEndPrice: (value: number | null) => void;
};

const CarSearchContext = createContext<CarSearchContextType | undefined>(
  undefined
);
export const CarSearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const makeParam = searchParams.get("make") || "Any_Makes";
  const modelParam = searchParams.get("model") || "Any_Models";
  const priceParam = searchParams.get("price") || "All_Prices";
  const { startPrice: priceStart, endPrice: priceEnd } =
    getPriceRange(priceParam);
  const [make, setMake] = useState(makeParam);
  const [model, setModel] = useState(modelParam);
  const [price, setPrice] = useState(priceParam);
  const [startPrice, setStartPrice] = useState<number | null>(priceStart);
  const [endPrice, setEndPrice] = useState<number | null>(priceEnd);
  return (
    <CarSearchContext.Provider
      value={{
        make,
        model,
        price,
        startPrice,
        endPrice,
        setMake,
        setModel,
        setPrice,
        setStartPrice,
        setEndPrice,
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
