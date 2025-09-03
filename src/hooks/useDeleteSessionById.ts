"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { ChatSessionSummary } from "@/interfaces/aiAssistant";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useDeleteSessionById = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      return await aiAssistantAPI.deleteSessionById(sessionId);
    },
    onMutate: async (sessionId) => {
      const queryKey = ["userSessions"];
      await queryClient.cancelQueries({ queryKey });

      const previousTitles =
        queryClient.getQueryData<ChatSessionSummary[]>(queryKey) || [];

      queryClient.setQueryData<ChatSessionSummary[]>(queryKey, (old = []) =>
        old.filter((chat) => chat.id !== sessionId)
      );
      return { previousTitles };
    },
    onError: (error, sessionId, context) => {
      if (context?.previousTitles) {
        queryClient.setQueryData(["userSessions"], context.previousTitles);
      }
      handleApiError(error, router);
    },
    onSuccess: () => {
      toast.success("Session deleted successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userSessions"] });
    },
  });
};

export default useDeleteSessionById;
