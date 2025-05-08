"use client";

import { Vehicle } from "@/interfaces/vehicle";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { PAGE_SIZE } from "../../constants";

type VehicleContextType = {
  vehicleList: Vehicle[];
  fetchMoreVehicles: () => void;
  loading: boolean;
  hasMore: boolean;
  make: string;
  setMake: (make: string) => void;
  model: string;
  setModel: (make: string) => void;
  price: string;
  setPrice: (make: string) => void;
};

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);
export const VehicleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [make, setMake] = useState<string>("Any Makes");
  const [model, setModel] = useState<string>("Any Models");
  const [price, setPrice] = useState<string>("All Prices");

  const fetchVehicles = async (newOffset = 0) => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get<Vehicle[]>(
        `http://localhost:5011/Vehicle?pageView=${PAGE_SIZE}&offset=${newOffset}`
      );
      const newVehicles = response.data;
      if (Array.isArray(newVehicles)) {
        if (newVehicles.length < PAGE_SIZE) {
          setHasMore(false);
        }

        setVehicleList((prev) => {
          const existingIds = new Set(prev.map((v: Vehicle) => v.id));
          const filtered = newVehicles.filter(
            (v: Vehicle) => !existingIds.has(v.id)
          );
          return [...prev, ...filtered];
        });

        setOffset((prev) => prev + PAGE_SIZE);
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
        hasMore,
        make,
        setMake,
        model,
        setModel,
        price,
        setPrice,
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
