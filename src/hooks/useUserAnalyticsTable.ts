"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useUserAnalyticsTable = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["user-analytics-table", startDate, endDate],
    queryFn: () => analyticsAPI.getUserTableAnalytics(startDate, endDate),
  });
};

export default useUserAnalyticsTable;
