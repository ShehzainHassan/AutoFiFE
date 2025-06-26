"use client";
import vehicleAPI from "@/api/vehicleAPI";
import { useQuery } from "@tanstack/react-query";

const useSimilarVehicles = (vehicleId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["vehicleRecommendations", vehicleId],
    queryFn: () => vehicleAPI.getSimilarVehicles(vehicleId),
    enabled,
  });
};

export default useSimilarVehicles;
