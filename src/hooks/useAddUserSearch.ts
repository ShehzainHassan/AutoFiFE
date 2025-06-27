"use client";
import userAPI from "@/api/userAPI";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useAddUserSearch = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

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

    onMutate: async ({ userId, search }) => {
      await queryClient.cancelQueries({
        queryKey: ["userSavedSearches", userId],
      });

      const previousSearches =
        queryClient.getQueryData<string[]>(["userSavedSearches", userId]) || [];

      queryClient.setQueryData<string[]>(
        ["userSavedSearches", userId],
        [...previousSearches, search]
      );

      return { previousSearches };
    },

    onError: (error, _newSearch, context) => {
      if (context?.previousSearches) {
        queryClient.setQueryData(
          ["userSavedSearches", _newSearch.userId],
          context.previousSearches
        );
      }
      handleApiError(error, router);
    },

    onSuccess: async (_, { userId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["userSavedSearches", userId],
      });
      toast.success("Search saved!");
    },
  });
};

export default useAddUserSearch;
