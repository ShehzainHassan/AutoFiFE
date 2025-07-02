"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import contactInfoAPI from "@/api/contactInfoAPI";
import { toast } from "react-toastify";
import { ContactFormData } from "@/interfaces/contact-info";
import { handleApiError } from "@/utilities/utilities";
import { useRouter } from "next/navigation";

const useSubmitInfo = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      const response = await contactInfoAPI.saveInfo(formData);
      return response;
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
      handleApiError(_err, router);
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
