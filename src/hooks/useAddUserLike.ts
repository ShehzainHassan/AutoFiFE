"use client";
import userAPI from "@/api/userAPI";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useAddUserLike = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ userId, vin }: { userId: number; vin: string }) => {
      return await userAPI.addUserLike(userId, vin);
    },

    onMutate: async ({ userId, vin }) => {
      await queryClient.cancelQueries({ queryKey: ["userLikedVins", userId] });

      const previousVins = queryClient.getQueryData<string[]>([
        "userLikedVins",
        userId,
      ]);

      queryClient.setQueryData<string[]>(
        ["userLikedVins", userId],
        (old = []) => {
          if (!old.includes(vin)) return [...old, vin];
          return old;
        }
      );

      return { previousVins };
    },

    onError: (error, { userId }, context) => {
      if (context?.previousVins) {
        queryClient.setQueryData(
          ["userLikedVins", userId],
          context.previousVins
        );
      }
      handleApiError(error, router);
    },

    onSettled: (_, __, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["userLikedVins", userId] });
    },

    onSuccess: () => {
      toast.success("Vehicle added to favorites!");
    },
  });
};

export default useAddUserLike;
