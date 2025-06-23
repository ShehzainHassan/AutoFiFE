"use client";
import vehicleAPI from "@/api/vehicleAPI";
import { useQuery } from "@tanstack/react-query";

const useGetRecommendations = (userId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["vehicleRecommendations", userId],
    queryFn: () => vehicleAPI.getRecommendations(userId),
    enabled,
  });
};

export default useGetRecommendations;
