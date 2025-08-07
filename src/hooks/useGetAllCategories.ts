"use client";
import vehicleAPI from "@/api/vehicleAPI";
import { useQuery } from "@tanstack/react-query";

const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["allCategories"],
    queryFn: () => vehicleAPI.getAllCategories(),
  });
};

export default useGetAllCategories;
