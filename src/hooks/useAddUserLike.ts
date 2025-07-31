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

    onMutate: async ({ vin }) => {
      await queryClient.cancelQueries({ queryKey: ["userLikedVins"] });

      const previousVins = queryClient.getQueryData<string[]>([
        "userLikedVins",
      ]);

      queryClient.setQueryData<string[]>(["userLikedVins"], (old = []) => {
        if (!old.includes(vin)) return [...old, vin];
        return old;
      });

      return { previousVins };
    },

    onError: (error, _variables, context) => {
      if (context?.previousVins) {
        queryClient.setQueryData(["userLikedVins"], context.previousVins);
      }
      handleApiError(error, router);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userLikedVins"] });
    },

    onSuccess: () => {
      toast.success("Vehicle added to favorites!");
    },
  });
};

export default useAddUserLike;
