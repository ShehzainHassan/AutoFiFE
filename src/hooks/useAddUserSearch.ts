"use client";
import userAPI from "@/api/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useAddUserSearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      search,
    }: {
      userId: number;
      search: string;
    }) => {
      return await userAPI.saveUserSearch(userId, search);
    },
    onSuccess: async (_, { userId }) => {
      await queryClient.refetchQueries({
        queryKey: ["userSavedSearches", userId],
      });
      toast.success("Search saved!");
    },
    onError: (error: unknown) => {
      let errorMessage = "An unexpected error occurred.";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      toast.error(errorMessage);
    },
  });
};
export default useAddUserSearch;
