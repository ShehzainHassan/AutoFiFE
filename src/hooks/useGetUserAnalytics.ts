"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useUserAnalytics = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["user-analytics", startDate, endDate],
    queryFn: () => analyticsAPI.getUserAnalytics(startDate, endDate),
  });
};

export default useUserAnalytics;
