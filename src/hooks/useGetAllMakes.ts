"use client";
import vehicleAPI from "@/api/vehicleAPI";
import { useQuery } from "@tanstack/react-query";

const useGetAllMakes = () => {
  return useQuery({
    queryKey: ["allMakes"],
    queryFn: () => vehicleAPI.getAllMakes(),
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetAllMakes;
