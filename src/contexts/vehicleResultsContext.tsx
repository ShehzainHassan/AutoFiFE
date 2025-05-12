"use client";
import { Vehicle } from "@/interfaces/vehicle";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { PAGE_SIZE } from "../../constants";
import { useVehicle } from "./vehicleContext";

type VehicleResultContextType = {
  vehicleList: Vehicle[];
  fetchVehicles: () => void;
  fetchMoreVehicles: () => void;
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
  const { makeGlobal } = useVehicle();
  const fetchVehiclesByMake = async (newOffset: number = 0) => {
    console.log("Fetching vehicles by make");
    console.log("offset = ", newOffset);

    if (newOffset === 0 && vehicleCache[makeGlobal]) {
      setVehicleList(vehicleCache[makeGlobal]);
      return;
    }
    if (!hasMore) {
      console.log("No more vehicles to fetch");
      return;
    }
    if (makeGlobal === "Any Makes") {
      console.log("Fetching all vehicles");
      setVehicleList(allVehicleList);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get<Vehicle[]>(
        `http://localhost:5011/Vehicle/by-make?pageView=${PAGE_SIZE}&offset=${newOffset}&make=${makeGlobal}`
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
          [makeGlobal]: newVehicles,
        }));
      }
    } catch (err) {
      console.error("Error fetching vehicles", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchVehicles = () => {
    console.log(makeGlobal);
    setVehicleList([]);
    setOffset(0);
    fetchVehiclesByMake(0);
  };
  useEffect(() => {
    setHasMore(true);
  }, [makeGlobal]);
  const fetchMoreVehicles = () => {
    fetchVehiclesByMake(offset);
  };

  return (
    <VehicleResultContext.Provider
      value={{
        vehicleList,
        fetchVehicles,
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
