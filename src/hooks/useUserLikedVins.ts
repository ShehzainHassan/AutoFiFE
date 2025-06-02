"use client";
import userAPI from "@/api/userAPI";
import { useQuery } from "@tanstack/react-query";

const useUserLikedVins = (userId: number | null) => {
  return useQuery({
    queryKey: ["userLikedVins", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const response = await userAPI.getUserLikedVins(userId);
      return response;
    },
    enabled: !!userId,
  });
};

export default useUserLikedVins;
