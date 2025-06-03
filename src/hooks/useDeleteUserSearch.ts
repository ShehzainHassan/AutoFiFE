"use client";
import userAPI from "@/api/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteUserSearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      search,
    }: {
      userId: number;
      search: string;
    }) => {
      return await userAPI.removeUserSearch(userId, search);
    },
    onSuccess: async (_, { userId }) => {
      await queryClient.refetchQueries({
        queryKey: ["userSavedSearches", userId],
      });
      toast.success("Search removed!");
    },
  });
};

export default useDeleteUserSearch;
