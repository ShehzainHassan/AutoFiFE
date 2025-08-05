"use client";
import auctionAPI from "@/api/auctionAPI";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type PaymentPayload = {
  auctionId: number;
  userId: number;
  amount: number;
};

const useTrackPayment = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ auctionId, userId, amount }: PaymentPayload) => {
      return await auctionAPI.paymentCompleted(auctionId, userId, amount);
    },
    onSuccess: () => {
      toast.success("Payment Completed Successfully!");
      router.push("/auction");
    },
  });
};

export default useTrackPayment;
