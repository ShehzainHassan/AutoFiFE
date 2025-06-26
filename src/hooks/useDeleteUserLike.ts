"use client";
import userAPI from "@/api/userAPI";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useDeleteUserLike = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ userId, vin }: { userId: number; vin: string }) => {
      return await userAPI.removeUserLike(userId, vin);
    },
    onMutate: async ({ userId, vin }) => {
      const queryKey = ["userLikedVins", userId];

      await queryClient.cancelQueries({ queryKey });

      const previousLikes = queryClient.getQueryData<string[]>(queryKey) || [];

      queryClient.setQueryData<string[]>(queryKey, (old = []) =>
        old.filter((v) => v !== vin)
      );

      return { previousLikes };
    },
    onError: (error, _, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(
          ["userLikedVins", _.userId],
          context.previousLikes
        );
      }
      handleApiError(error, router);
    },
    onSuccess: () => {
      toast.success("Vehicle removed from favorites!");
    },
    onSettled: (_, __, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["userLikedVins", userId] });
    },
  });
};

export default useDeleteUserLike;
