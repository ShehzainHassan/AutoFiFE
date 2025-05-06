"use client";

import { Vehicle } from "@/interfaces/vehicle";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { PAGE_SIZE } from "../../constants";

type VehicleContextType = {
  vehicleList: Vehicle[];
  fetchMoreVehicles: () => void;
  loading: boolean;
};

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);
export const VehicleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVehicles = async (newOffset = 0) => {
    setLoading(true);
    try {
      const response = await axios.get<Vehicle[]>(
        `http://localhost:5011/Vehicle?pageView=${PAGE_SIZE}&offset=${newOffset}`
      );
      const newVehicles = response.data;
      if (Array.isArray(newVehicles) && newVehicles.length > 0) {
        setVehicleList((prev) => {
          const existingIds = new Set(prev.map((v: Vehicle) => v.id));
          const filtered = newVehicles.filter(
            (v: Vehicle) => !existingIds.has(v.id)
          );
          return [...prev, ...filtered];
        });
        setOffset((prev) => prev + 20);
      }
    } catch (err) {
      console.error("Error fetching vehicles ", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVehicles(0);
  }, []);
  const fetchMoreVehicles = () => {
    fetchVehicles(offset);
  };
  return (
    <VehicleContext.Provider
      value={{
        vehicleList,
        fetchMoreVehicles,
        loading,
      }}>
      {children}
    </VehicleContext.Provider>
  );
};

export function useVehicle() {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicle must be used within a VehicleProvider");
  }
  return context;
}
