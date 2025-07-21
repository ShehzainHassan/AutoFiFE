"use client";
import auctionAPI from "@/api/auctionAPI";
import { AutoBid } from "@/interfaces/auction";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const usePlaceAutoBid = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (autoBid: AutoBid) => {
      return await auctionAPI.placeAutoBid(autoBid);
    },

    onError: (error) => {
      handleApiError(error, router);
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
