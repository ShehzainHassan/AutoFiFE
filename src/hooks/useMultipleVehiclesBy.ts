// hooks/useMultipleVehicles.ts
"use client";
import vehicleAPI from "@/api/vehicleAPI";
import { useQueries } from "@tanstack/react-query";

export default function useMultipleVehicles(ids: (number | null)[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ["vehicles", id],
      queryFn: () => vehicleAPI.getById(id!),
      enabled: id !== null,
    })),
  });
}
