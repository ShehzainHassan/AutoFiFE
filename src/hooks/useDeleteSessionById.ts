"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { ChatSessionSummary } from "@/interfaces/aiAssistant";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteSessionVars {
  sessionId: string;
  userId: number | null;
}

const useDeleteSessionById = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ sessionId }: DeleteSessionVars) => {
      return await aiAssistantAPI.deleteSessionById(sessionId);
    },
    onMutate: async ({ sessionId, userId }: DeleteSessionVars) => {
      const queryKey = ["userSessions", userId];
      await queryClient.cancelQueries({ queryKey });

      const previousTitles =
        queryClient.getQueryData<ChatSessionSummary[]>(queryKey) || [];

      queryClient.setQueryData<ChatSessionSummary[]>(queryKey, (old = []) =>
        old.filter((chat) => chat.id !== sessionId)
      );

      return { previousTitles, userId };
    },
    onError: (error, _variables, context) => {
      if (context?.previousTitles && context?.userId !== null) {
        queryClient.setQueryData(
          ["userSessions", context.userId],
          context.previousTitles
        );
      }
      handleApiError(error, router);
    },
    onSuccess: (_data, { userId }: DeleteSessionVars) => {
      if (userId !== null) {
        toast.success("Session deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["userSessions", userId] });
      }
    },
  });
};

export default useDeleteSessionById;
