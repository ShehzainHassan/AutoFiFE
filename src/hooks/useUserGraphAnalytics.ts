"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useUserGraphAnalytics = (period: string) => {
  return useQuery({
    queryKey: ["user-graph-analytics", period],
    queryFn: () => analyticsAPI.getUserGraphAnalytics(period),
  });
};

export default useUserGraphAnalytics;
