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
    onSuccess: async (_, { userId }) => {
      await queryClient.refetchQueries({
        queryKey: ["userSavedSearches", userId],
      });
      toast.success("Search removed!");
    },
    onError: (error) => handleApiError(error, router),
  });
};

export default useDeleteUserSearch;
