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

    onMutate: async ({ search }) => {
      await queryClient.cancelQueries({
        queryKey: ["userSavedSearches"],
      });

      const previousSearches = queryClient.getQueryData<string[]>([
        "userSavedSearches",
      ]);

      queryClient.setQueryData<string[]>(["userSavedSearches"], (old = []) =>
        old.filter((s) => s !== search)
      );

      return { previousSearches };
    },

    onError: (error, _vars, context) => {
      queryClient.setQueryData(
        ["userSavedSearches"],
        context?.previousSearches
      );
      handleApiError(error, router);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["userSavedSearches"],
      });
    },

    onSuccess: () => {
      toast.success("Search removed!");
    },
  });
};

export default useDeleteUserSearch;
