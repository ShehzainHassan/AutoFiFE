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
  return useMutation({
    mutationFn: async ({
      userId,
      question,
      session_id,
    }: {
      userId: number;
      question: string;
      session_id: string | null;
    }): Promise<AIResponseModel> => {
      return await aiAssistantAPI.getAIResponse(userId, question, session_id);
    },
    onSuccess: (res) => {
      options?.onSuccess?.(res);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["userSessions"] });
      }, 500);
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
