"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { ChatSessionSummary } from "@/interfaces/aiAssistant";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useEditSessionTitle = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      sessionId,
      newTitle,
    }: {
      sessionId: string;
      newTitle: string;
    }) => {
      return await aiAssistantAPI.editSessionTitle(sessionId, newTitle);
    },
    onMutate: async ({ sessionId, newTitle }) => {
      const queryKey = ["userSessions"];
      await queryClient.cancelQueries({ queryKey });

      const previousSessions =
        queryClient.getQueryData<ChatSessionSummary[]>(queryKey) || [];

      queryClient.setQueryData<ChatSessionSummary[]>(queryKey, (old = []) =>
        old.map((chat) =>
          chat.id === sessionId
            ? { ...chat, title: newTitle, updatedAt: new Date().toISOString() }
            : chat
        )
      );

      return { previousSessions };
    },
    onError: (error, _, context) => {
      if (context?.previousSessions) {
        queryClient.setQueryData(["userSessions"], context.previousSessions);
      }
      handleApiError(error, router);
    },
    onSuccess: () => {
      toast.success("Session title updated!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userSessions"] });
    },
  });
};

export default useEditSessionTitle;
