"use client";
import vehicleAPI from "@/api/vehicleAPI";
import { useQuery } from "@tanstack/react-query";

const useVehiclesById = (id: number) => {
  return useQuery({
    queryKey: ["vehicles", id],
    queryFn: () => vehicleAPI.getById(id),
    staleTime: 5 * 60 * 1000,
  });
};
export default useVehiclesById;
