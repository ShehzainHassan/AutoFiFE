"use client";

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
  const [make, setMake] = useState("Any_Makes");
  const [model, setModel] = useState("Any_Models");
  const [price, setPrice] = useState("All_Prices");
  const [startPrice, setStartPrice] = useState<number | null>(null);
  const [endPrice, setEndPrice] = useState<number | null>(null);
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
