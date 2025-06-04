"use client";
import userAPI from "@/api/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
    onError: (error: unknown) => {
      console.log(error);
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

export default useAddUserLike;
