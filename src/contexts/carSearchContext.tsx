"use client";

import { createContext, useContext, useState } from "react";

type CarSearchContextType = {
  make: string;
  model: string;
  price: string;
  setMake: (value: string) => void;
  setModel: (value: string) => void;
  setPrice: (value: string) => void;
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
  return (
    <CarSearchContext.Provider
      value={{
        make,
        model,
        price,
        setMake,
        setModel,
        setPrice,
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
