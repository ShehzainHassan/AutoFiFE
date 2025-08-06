"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useAuctionAnalytics = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["auction-analytics", startDate, endDate],
    queryFn: () => analyticsAPI.getAuctionAnalytics(startDate, endDate),
  });
};

export default useAuctionAnalytics;
