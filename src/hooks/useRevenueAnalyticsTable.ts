"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useRevenueAnalyticsTable = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["revenue-analytics-table", startDate, endDate],
    queryFn: () => analyticsAPI.getRevenueTableAnalytics(startDate, endDate),
  });
};

export default useRevenueAnalyticsTable;
