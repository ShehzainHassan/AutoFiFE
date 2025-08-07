"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useRevenueGraphAnalytics = (period: string) => {
  return useQuery({
    queryKey: ["revenue--graph-analytics", period],
    queryFn: () => analyticsAPI.getRevenueGraphAnalytics(period),
  });
};

export default useRevenueGraphAnalytics;
