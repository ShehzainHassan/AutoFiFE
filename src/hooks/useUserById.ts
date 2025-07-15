"use client";
import userAPI from "@/api/userAPI";
import { useQuery } from "@tanstack/react-query";

const useUserById = (id: number) => {
  return useQuery({
    queryKey: ["userById", id],
    queryFn: async () => {
      const response = await userAPI.getUserById(id);
      return response;
    },
  });
};

export default useUserById;
