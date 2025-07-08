"use client";
import newsLetterAPI from "@/api/newsLetterAPI";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useNewsLetter = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (email: string) => {
      const response = await newsLetterAPI.saveInfo(email);
      return response;
    },

    onMutate: async (newEmail: string) => {
      await queryClient.cancelQueries({ queryKey: ["newsletter"] });

      const previousMessages = queryClient.getQueryData(["newsletter"]);

      queryClient.setQueryData(
        ["newsletter"],
        (old: { email: string; status: string }[] = []) => [
          ...old,
          { email: newEmail, status: "pending" },
        ]
      );

      return { previousMessages };
    },

    onError: (_err, _newEmail, context) => {
      queryClient.setQueryData(["newsletter"], context?.previousMessages);
      handleApiError(_err, router);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter"] });
    },

    onSuccess: () => {
      toast.success("Email subscribed successfully!");
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export default useNewsLetter;
