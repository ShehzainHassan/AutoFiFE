"use client";

import analyticsAPI from "@/api/analyticsAPI";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

const useRecentDownloads = () => {
  return useInfiniteQuery({
    queryKey: ["recentDownloads"],
    queryFn: async ({ pageParam = 1 }) => {
      return await analyticsAPI.getRecentDownloads(pageParam, PAGE_SIZE);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.totalItems / PAGE_SIZE);
      const nextPage = pages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
};

export default useRecentDownloads;
