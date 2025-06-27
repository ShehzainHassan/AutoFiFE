"use client";
import userAPI from "@/api/userAPI";
import { User } from "@/interfaces/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useSaveUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: User) => {
      return await userAPI.saveUser(formData);
    },

    onMutate: async (newUser: User) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });

      const previousUser = queryClient.getQueryData<User>(["user"]);

      queryClient.setQueryData(["user"], newUser);

      return { previousUser };
    },

    onError: (error: unknown, _newUser, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user"], context.previousUser);
      }

      let errorMessage = "An unexpected error occurred.";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      toast.error(errorMessage);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onSuccess: () => {
      toast.success("Registration successful!");
    },
  });
};

export default useSaveUser;
