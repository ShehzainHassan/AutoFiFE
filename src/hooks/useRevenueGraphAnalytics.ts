"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useRevenueGraphAnalytics = (
  startDate: string,
  endDate: string,
  type: string,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["revenue-graph-analytics", startDate, endDate, type],
    queryFn: () =>
      analyticsAPI.getRevenueGraphAnalytics(startDate, endDate, type),
    enabled,
  });
};

export default useRevenueGraphAnalytics;
