"use client";
import userAPI from "@/api/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAddUserLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, vin }: { userId: number; vin: string }) => {
      return await userAPI.addUserLike(userId, vin);
    },
    onSuccess: async (_, { userId }) => {
      await queryClient.refetchQueries({ queryKey: ["userLikedVins", userId] });
      toast.success("Vehicle added to favorites!");
    },
  });
};

export default useAddUserLike;
