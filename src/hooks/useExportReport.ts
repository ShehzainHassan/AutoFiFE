"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useExportReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      reportType,
      startDate,
      endDate,
      format,
    }: {
      reportType: string;
      startDate: string;
      endDate: string;
      format: string;
    }) => {
      await analyticsAPI.exportReport(reportType, startDate, endDate, format);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recentDownloads"],
      });
    },
  });
};

export default useExportReport;
