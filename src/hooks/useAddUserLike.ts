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
    onSuccess: async (_, { userId }) => {
      await queryClient.refetchQueries({ queryKey: ["userLikedVins", userId] });
      toast.success("Vehicle added to favorites!");
    },
    onError: (error) => handleApiError(error, router),
  });
};

export default useAddUserLike;
