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

    onMutate: async (autoBid) => {
      await queryClient.cancelQueries({
        queryKey: ["isAutoBidSet", autoBid.auctionId],
      });
      await queryClient.cancelQueries({
        queryKey: ["userAutoBid", autoBid.auctionId],
      });

      const previousIsSet = queryClient.getQueryData([
        "isAutoBidSet",
        autoBid.auctionId,
        autoBid.userId,
      ]);
      const previousUserAutoBid = queryClient.getQueryData([
        "userAutoBid",
        autoBid.auctionId,
      ]);

      queryClient.setQueryData(["isAutoBidSet", autoBid.auctionId], true);
      queryClient.setQueryData(["userAutoBid", autoBid.auctionId], autoBid);

      return { previousIsSet, previousUserAutoBid };
    },

    onError: (error: AxiosError, _variables, context) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        handleApiError(error, router);
      } else {
        const message =
          (error.response?.data as { error?: string })?.error ||
          "Failed to place auto bid. Please try again.";
        toast.error(message);
      }

      if (context) {
        queryClient.setQueryData(
          ["isAutoBidSet", _variables.auctionId],
          context.previousIsSet
        );
        queryClient.setQueryData(
          ["userAutoBid", _variables.auctionId],
          context.previousUserAutoBid
        );
      }
    },

    onSuccess: async (_data, variables) => {
      toast.success("Auto bid is enabled!");
      queryClient.invalidateQueries({
        queryKey: ["isAutoBidSet", variables.auctionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["userAutoBid", variables.auctionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["highest-bidder", variables.auctionId],
      });
    },
  });
};

export default usePlaceAutoBid;
