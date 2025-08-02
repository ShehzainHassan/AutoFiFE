"use client";
import userAPI from "@/api/userAPI";
import { useQuery } from "@tanstack/react-query";

const useUserLikedVins = (enabled: boolean) => {
  return useQuery({
    queryKey: ["userLikedVins"],
    queryFn: async () => {
      const response = await userAPI.getUserLikedVins();
      return response;
    },
    enabled,
  });
};

export default useUserLikedVins;
