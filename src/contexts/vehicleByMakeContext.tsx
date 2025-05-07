"use client";

import { Vehicle } from "@/interfaces/vehicle";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { PAGE_SIZE } from "../../constants";

type VehicleByMakeContextType = {
  vehicleList: Vehicle[];
  fetchMoreVehicles: () => void;
  loading: boolean;
  make: string;
  setMake: (make: string) => void;
};

type VehicleDetails = {
  vehicles: Vehicle[];
  offset: number;
  hasMore: boolean;
};

const VehicleByMakeContext = createContext<
  VehicleByMakeContextType | undefined
>(undefined);

export const VehicleByMakeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vehiclesByMakeList, setVehicleByMakeList] = useState<
    Record<string, VehicleDetails>
  >({});
  const [make, setMake] = useState<string>("Audi");
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
    const cached = vehiclesByMakeList[make];
    if (cached) {
      setCurrentList(cached.vehicles);
    } else {
      setCurrentList([]);
      fetchVehicles(make, 0);
    }
  }, [make, vehiclesByMakeList]);

  const fetchMoreVehicles = () => {
    const cache = vehiclesByMakeList[make];
    if (cache && cache.hasMore && !loading) {
      fetchVehicles(make, cache.offset);
    }
  };

  useEffect(() => {
    if (vehiclesByMakeList[make]) {
      setCurrentList(vehiclesByMakeList[make].vehicles);
    }
  }, [vehiclesByMakeList, make]);

  return (
    <VehicleByMakeContext.Provider
      value={{
        vehicleList: currentList,
        fetchMoreVehicles,
        loading,
        make,
        setMake,
      }}>
      {children}
    </VehicleByMakeContext.Provider>
  );
};
export function useVehicleByMake() {
  const context = useContext(VehicleByMakeContext);
  if (!context) {
    throw new Error(
      "useVehicleByMake must be used within a VehicleByMakeProvider"
    );
  }
  return context;
}
