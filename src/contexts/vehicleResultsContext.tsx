"use client";
import { Vehicle } from "@/interfaces/vehicle";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { PAGE_SIZE } from "../../constants";
import { useVehicle } from "./vehicleContext";
import { getMakeByModel } from "@/utilities/utilities";

type VehicleResultContextType = {
  vehicleList: Vehicle[];
  fetchVehiclesByMake: (make: string, offset: number) => void;
  fetchVehiclesByModel: (model: string, offset: number) => void;
  fetchMoreVehicles: (make: string) => void;
  loading: boolean;
};

const VehicleResultContext = createContext<
  VehicleResultContextType | undefined
>(undefined);

export const VehicleResultProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [vehicleCache, setVehicleCache] = useState<Record<string, Vehicle[]>>(
    {}
  );
  const { vehicleList: allVehicleList } = useVehicle();
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const fetchVehiclesByMake = async (make: string, newOffset: number = 0) => {
    if (newOffset === 0) {
      setVehicleList([]);
      setHasMore(true);
    }
    if (newOffset !== 0 && !hasMore) {
      return;
    }
    if (newOffset === 0 && vehicleCache[make]) {
      setVehicleList(vehicleCache[make]);
      return;
    }

    if (make === "Any Makes") {
      setVehicleList(allVehicleList);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get<Vehicle[]>(
        `http://localhost:5011/Vehicle/by-make?pageView=${PAGE_SIZE}&offset=${newOffset}&make=${make}`
      );

      const newVehicles = response.data;
      if (Array.isArray(newVehicles)) {
        if (newVehicles.length < PAGE_SIZE) {
          setHasMore(false);
        }
        setVehicleList(newVehicles);
        setOffset(newOffset + PAGE_SIZE);
      }
      if (newOffset === 0) {
        setVehicleCache((prev) => ({
          ...prev,
          [make]: newVehicles,
        }));
      }
    } catch (err) {
      console.error("Error fetching vehicles", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchVehiclesByModel = async (model: string, newOffset: number = 0) => {
    if (newOffset === 0) {
      setVehicleList([]);
      setHasMore(true);
    }
    if (newOffset !== 0 && !hasMore) {
      return;
    }
    if (newOffset === 0 && vehicleCache[model]) {
      setVehicleList(vehicleCache[model]);
      return;
    }
    if (model === "Any Models") {
      const make = getMakeByModel(model);
      if (make) fetchVehiclesByMake(make, 0);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get<Vehicle[]>(
        `http://localhost:5011/Vehicle/by-model?pageView=${PAGE_SIZE}&offset=${newOffset}&model=${model}`
      );

      const newVehicles = response.data;
      if (Array.isArray(newVehicles)) {
        if (newVehicles.length < PAGE_SIZE) {
          setHasMore(false);
        }
        setVehicleList(newVehicles);
        setOffset(newOffset + PAGE_SIZE);
      }
      if (newOffset === 0) {
        setVehicleCache((prev) => ({
          ...prev,
          [model]: newVehicles,
        }));
      }
    } catch (err) {
      console.error("Error fetching vehicles", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreVehicles = (make: string) => {
    fetchVehiclesByMake(make, offset);
  };

  return (
    <VehicleResultContext.Provider
      value={{
        vehicleList,
        fetchVehiclesByMake,
        fetchVehiclesByModel,
        fetchMoreVehicles,
        loading,
      }}>
      {children}
    </VehicleResultContext.Provider>
  );
};
export function useVehicleResult() {
  const context = useContext(VehicleResultContext);
  if (!context) {
    throw new Error(
      "useVehicleResult must be used within a VehicleResultProvider"
    );
  }
  return context;
}
