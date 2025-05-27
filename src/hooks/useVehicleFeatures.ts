"use client";
import vehicleAPI from "@/api/vehicleAPI";
import { useQuery } from "@tanstack/react-query";

const useVehicleFeatures = (make: string, model: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["vehicles", make, model],
    queryFn: () => vehicleAPI.getCarFeatures(make, model),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export default useVehicleFeatures;
