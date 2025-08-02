"use client";
import userAPI from "@/api/userAPI";
import { useQuery } from "@tanstack/react-query";

const useUserSavedSearches = (enabled: boolean) => {
  return useQuery({
    queryKey: ["userSavedSearches"],
    queryFn: async () => {
      const response = await userAPI.getUserSearches();
      return response;
    },
    enabled,
  });
};

export default useUserSavedSearches;
