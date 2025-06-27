"use client";
import userAPI from "@/api/userAPI";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useDeleteUserSearch = () => {
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
      return await userAPI.removeUserSearch(userId, search);
    },

    onMutate: async ({ userId, search }) => {
      await queryClient.cancelQueries({
        queryKey: ["userSavedSearches", userId],
      });

      const previousSearches = queryClient.getQueryData<string[]>([
        "userSavedSearches",
        userId,
      ]);

      queryClient.setQueryData<string[]>(
        ["userSavedSearches", userId],
        (old = []) => old.filter((s) => s !== search)
      );

      return { previousSearches };
    },

    onError: (error, _vars, context) => {
      queryClient.setQueryData(
        ["userSavedSearches", _vars.userId],
        context?.previousSearches
      );
      handleApiError(error, router);
    },

    onSettled: (_data, _error, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["userSavedSearches", userId],
      });
    },

    onSuccess: () => {
      toast.success("Search removed!");
    },
  });
};

export default useDeleteUserSearch;
