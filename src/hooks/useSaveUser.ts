"use client";
import userAPI from "@/api/userAPI";
import { User } from "@/interfaces/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useSaveUser = () => {
  return useMutation({
    mutationFn: async (formData: User) => {
      return await userAPI.saveUser(formData);
    },
    onSuccess: () => {
      toast.success("Registration successfull!");
    },
    onError: (error) => {
      toast.error(`Failed to register: ${error.message}`);
    },
  });
};

export default useSaveUser;
