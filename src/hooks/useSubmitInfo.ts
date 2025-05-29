"use client";
import { useMutation } from "@tanstack/react-query";
import contactInfoAPI from "@/api/contactInfoAPI";
import { toast } from "react-toastify";
import { ContactFormData } from "@/interfaces/contact-info";

const useSubmitInfo = () => {
  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      return await contactInfoAPI.saveInfo(formData);
    },
    onSuccess: () => {
      toast.success("Message sent successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to send message: ${error.message}`);
    },
  });
};

export default useSubmitInfo;
