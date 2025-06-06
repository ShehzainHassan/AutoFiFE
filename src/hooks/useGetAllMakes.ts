"use client";
import vehicleAPI from "@/api/vehicleAPI";
import { useQuery } from "@tanstack/react-query";

const useGetAllMakes = () => {
  return useQuery({
    queryKey: ["allMakes"],
    queryFn: () => vehicleAPI.getAllMakes(),
    enabled: false,
  });
};

export default useGetAllMakes;
