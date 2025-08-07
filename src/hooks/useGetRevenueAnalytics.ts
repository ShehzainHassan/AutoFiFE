"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useGetRevenueAnalytics = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["revenue-analytics", startDate, endDate],
    queryFn: () => analyticsAPI.getRevenueAnalytics(startDate, endDate),
  });
};

export default useGetRevenueAnalytics;
