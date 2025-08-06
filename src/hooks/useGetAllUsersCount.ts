"use client";
import userAPI from "@/api/userAPI";
import { useQuery } from "@tanstack/react-query";

const useGetAllUsersCount = () => {
  return useQuery({
    queryKey: ["allUserCount"],
    queryFn: () => userAPI.getAllUsersCount(),
  });
};

export default useGetAllUsersCount;
