"use client";
import auctionAPI from "@/api/auctionAPI";
import { AutoBid } from "@/interfaces/auction";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const usePlaceAutoBid = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (autoBid: AutoBid) => {
      return await auctionAPI.placeAutoBid(autoBid);
    },

    onError: (error: AxiosError) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        handleApiError(error, router);
      } else {
        const message =
          (error.response?.data as { error?: string })?.error ||
          "Failed to place auto bid. Please try again.";
        toast.error(message);
      }
    },

    onSuccess: (_data, variables) => {
      toast.success("Auto bid is enabled!");
      queryClient.invalidateQueries({
        queryKey: ["isAutoBidSet", variables.auctionId, variables.userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["userAutoBid", variables.userId, variables.auctionId],
      });
    },
  });
};

export default usePlaceAutoBid;
