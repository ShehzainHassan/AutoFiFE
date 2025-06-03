"use client";
import userAPI from "@/api/userAPI";
import { useQuery } from "@tanstack/react-query";

const useUserSavedSearches = (userId: number | null) => {
  return useQuery({
    queryKey: ["userSavedSearches", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const response = await userAPI.getUserSearches(userId);
      return response;
    },
    enabled: !!userId,
  });
};

export default useUserSavedSearches;
