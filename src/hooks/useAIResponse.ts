"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { AIResponseModel } from "@/interfaces/aiAssistant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useAIResponse = (options?: {
  onSuccess?: (res: AIResponseModel) => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<
    AIResponseModel,
    unknown,
    { userId: number; question: string; session_id: string | null }
  >({
    mutationFn: async ({ userId, question, session_id }) => {
      return await aiAssistantAPI.getAIResponse(userId, question, session_id);
    },
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userChats", variables.session_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["userSessions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userQuota", variables.userId],
      });
      options?.onSuccess?.(res);
    },
    onError: (error: unknown) => {
      options?.onError?.();

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

export default useAIResponse;
