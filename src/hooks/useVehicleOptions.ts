"use client";
import vehicleAPI from "@/api/vehicleAPI";
import { useQuery } from "@tanstack/react-query";

const useVehicleOptions = () => {
  return useQuery({
    queryKey: ["vehicleOptions"],
    queryFn: () => vehicleAPI.getVehicleOptions(),
  });
};

export default useVehicleOptions;
