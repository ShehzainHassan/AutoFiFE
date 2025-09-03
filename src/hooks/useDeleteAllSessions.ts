"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { ChatSessionSummary } from "@/interfaces/aiAssistant";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useDeleteAllSessions = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return await aiAssistantAPI.deleteAllSessions();
    },
    onMutate: async () => {
      const queryKey = ["userSessions"];
      await queryClient.cancelQueries({ queryKey });

      const previousTitles =
        queryClient.getQueryData<ChatSessionSummary[]>(queryKey) || [];

      queryClient.setQueryData(["userSessions"], []);
      return { previousTitles };
    },
    onError: (error, _, context) => {
      if (context?.previousTitles) {
        queryClient.setQueryData(["userSessions"], context.previousTitles);
      }
      handleApiError(error, router);
    },
    onSuccess: () => {
      toast.success("All sessions deleted!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userSessions"] });
    },
  });
};

export default useDeleteAllSessions;
