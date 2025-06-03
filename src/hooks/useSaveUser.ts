"use client";
import userAPI from "@/api/userAPI";
import { User } from "@/interfaces/user";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useSaveUser = () => {
  return useMutation({
    mutationFn: async (formData: User) => {
      return await userAPI.saveUser(formData);
    },
    onSuccess: () => {
      toast.success("Registration successfull!");
    },
    onError: (error: unknown) => {
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
export default useSaveUser;
