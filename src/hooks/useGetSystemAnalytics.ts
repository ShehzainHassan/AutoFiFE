"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useGetSystemAnalytics = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["system-analytics", startDate, endDate],
    queryFn: () => analyticsAPI.getSystemAnalytics(startDate, endDate),
  });
};

export default useGetSystemAnalytics;
