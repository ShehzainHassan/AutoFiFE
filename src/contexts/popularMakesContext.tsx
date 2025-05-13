"use client";
import { PAGE_SIZE } from "@/constants";
import { Vehicle } from "@/interfaces/vehicle";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type PopularMakesContextType = {
  vehicleList: Vehicle[];
  fetchMoreVehicles: () => void;
  loading: boolean;
  make_Popular: string;
  setMake_Popular: (make: string) => void;
};

type VehicleDetails = {
  vehicles: Vehicle[];
  offset: number;
  hasMore: boolean;
};

const PopularMakesContext = createContext<PopularMakesContextType | undefined>(
  undefined
);

export const PopularMakesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vehiclesByMakeList, setVehicleByMakeList] = useState<
    Record<string, VehicleDetails>
  >({});
  const [make_Popular, setMake_Popular] = useState<string>("Audi");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentList, setCurrentList] = useState<Vehicle[]>([]);

  const fetchVehicles = async (makeKey: string, newOffset: number = 0) => {
    setLoading(true);
    try {
      const response = await axios.get<Vehicle[]>(
        `http://localhost:5011/Vehicle/by-make?pageView=${PAGE_SIZE}&offset=${newOffset}&make=${makeKey}`
      );

      const newVehicles = response.data;
      if (Array.isArray(newVehicles)) {
        setVehicleByMakeList((prev) => {
          const existing = prev[makeKey] || {
            vehicles: [],
            offset: 0,
            hasMore: true,
          };
          const existingIds = new Set(existing.vehicles.map((v) => v.id));
          const filtered = newVehicles.filter((v) => !existingIds.has(v.id));
          const updatedList = [...existing.vehicles, ...filtered];
          const hasMore = filtered.length === PAGE_SIZE;

          return {
            ...prev,
            [makeKey]: {
              vehicles: updatedList,
              offset: existing.offset + PAGE_SIZE,
              hasMore,
            },
          };
        });
      }
    } catch (err) {
      console.error("Error fetching vehicles", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cached = vehiclesByMakeList[make_Popular];
    if (cached) {
      setCurrentList(cached.vehicles);
    } else {
      setCurrentList([]);
      fetchVehicles(make_Popular, 0);
    }
  }, [make_Popular, vehiclesByMakeList]);

  const fetchMoreVehicles = () => {
    const vehicles = vehiclesByMakeList[make_Popular];
    if (vehicles && vehicles.hasMore && !loading) {
      fetchVehicles(make_Popular, vehicles.offset);
    }
  };

  useEffect(() => {
    if (vehiclesByMakeList[make_Popular]) {
      setCurrentList(vehiclesByMakeList[make_Popular].vehicles);
    }
  }, [vehiclesByMakeList, make_Popular]);

  return (
    <PopularMakesContext.Provider
      value={{
        vehicleList: currentList,
        fetchMoreVehicles,
        loading,
        make_Popular,
        setMake_Popular,
      }}>
      {children}
    </PopularMakesContext.Provider>
  );
};
export function usePopularMakes() {
  const context = useContext(PopularMakesContext);
  if (!context) {
    throw new Error(
      "usePopularMakes must be used within a PopularMakesProvider"
    );
  }
  return context;
}
