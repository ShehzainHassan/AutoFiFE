"use client";

import notificationAPI from "@/api/notificationAPI";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 10;

const usePaginatedNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["userNotifications"],
    queryFn: async ({ pageParam = 1 }) => {
      return await notificationAPI.getUserNotifications(pageParam, PAGE_SIZE);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.totalItems / PAGE_SIZE);
      const nextPage = pages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
};

export default usePaginatedNotifications;
