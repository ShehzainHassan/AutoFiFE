"use client";
import userAPI from "@/api/userAPI";
import { useAuth } from "@/contexts/auth-context";
import { LoginDTO } from "@/interfaces/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useLoginUser = () => {
  const { setAuthData } = useAuth();

  return useMutation({
    mutationFn: async (formData: LoginDTO) => {
      return await userAPI.loginUser(formData);
    },
    onSuccess: async (data) => {
      setAuthData({
        accessToken: data.accessToken,
        userId: data.userId,
        userName: data.userName,
        userEmail: data.userEmail,
      });
      toast.success("Login successful!");
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
