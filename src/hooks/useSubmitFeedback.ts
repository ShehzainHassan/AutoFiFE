"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import aiAssistantAPI from "@/api/aiAssistantAPI";

type FeedbackVote = "NOTVOTED" | "UPVOTED" | "DOWNVOTED";

interface FeedbackPayload {
  message_id: number;
  vote: FeedbackVote;
}

const useSubmitFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ message_id, vote }: FeedbackPayload) => {
      return await aiAssistantAPI.submitFeedback(message_id, vote);
    },

    onMutate: async ({ message_id, vote }) => {
      await queryClient.cancelQueries({ queryKey: ["feedback", message_id] });

      const previousFeedback = queryClient.getQueryData<FeedbackVote>([
        "feedback",
        message_id,
      ]);

      queryClient.setQueryData(["feedback", message_id], vote);

      return { previousFeedback, message_id };
    },

    onError: (error: unknown, _variables, context) => {
      if (context?.previousFeedback) {
        queryClient.setQueryData(
          ["feedback", context.message_id],
          context.previousFeedback
        );
      }

      let errorMessage = "Failed to submit feedback.";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage);
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["feedback", variables.message_id],
      });
    },

    onSuccess: () => {
      toast.success("Feedback submitted successfully!");
    },
  });
};

export default useSubmitFeedback;
