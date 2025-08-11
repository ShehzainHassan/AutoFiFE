"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useUserGraphAnalytics = (
  startDate: string,
  endDate: string,
  type: string,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["user-graph-analytics", startDate, endDate, type],
    queryFn: () => analyticsAPI.getUserGraphAnalytics(startDate, endDate, type),
    enabled,
  });
};

export default useUserGraphAnalytics;
