"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import contactInfoAPI from "@/api/contactInfoAPI";
import { toast } from "react-toastify";
import { ContactFormData } from "@/interfaces/contact-info";

const useSubmitInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      return await contactInfoAPI.saveInfo(formData);
    },
    onMutate: async (newMessage) => {
      await queryClient.cancelQueries({ queryKey: ["messages"] });

      const previousMessages = queryClient.getQueryData(["messages"]);

      queryClient.setQueryData(["messages"], (old: ContactFormData[] = []) => [
        ...old,
        { ...newMessage, status: "pending" },
      ]);

      return { previousMessages };
    },
    onError: (_err, _newMessage, context) => {
      queryClient.setQueryData(["messages"], context?.previousMessages);
      toast.error("Failed to send message.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onSuccess: () => {
      toast.success("Message sent successfully!");
    },
  });
};

export default useSubmitInfo;
