"use client";
import userAPI from "@/api/userAPI";
import { useQuery } from "@tanstack/react-query";

const useUserLikedVins = () => {
  return useQuery({
    queryKey: ["userLikedVins"],
    queryFn: async () => {
      const response = await userAPI.getUserLikedVins();
      return response;
    },
  });
};

export default useUserLikedVins;
