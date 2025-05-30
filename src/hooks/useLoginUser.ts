"use client";
import userAPI from "@/api/userAPI";
import { LoginDTO } from "@/interfaces/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useLoginUser = () => {
  return useMutation({
    mutationFn: async (formData: LoginDTO) => {
      return await userAPI.loginUser(formData);
    },
    onSuccess: async (data) => {
      const userData = {
        token: data.token,
        userId: data.userId,
        userName: data.userName,
      };

      localStorage.setItem("authData", JSON.stringify(userData));
      toast.success("Registration successfull!");
    },
    onError: (error: unknown) => {
      let errorMessage = "Login failed";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    },
  });
};

export default useLoginUser;
