"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useAPIGraphAnalytics = (
  startDate: string,
  endDate: string,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["api-graph-analytics", startDate, endDate],
    queryFn: () => analyticsAPI.getAPIGraphAnalytics(startDate, endDate),
    enabled,
  });
};

export default useAPIGraphAnalytics;
