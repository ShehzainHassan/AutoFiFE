"use client";
import auctionAPI from "@/api/auctionAPI";
import { UpdateAutoBid } from "@/interfaces/auction";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UpdateAutoBidParams {
  auctionId: number;
  updateAutoBid: UpdateAutoBid;
}

const useUpdateAutoBid = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ auctionId, updateAutoBid }: UpdateAutoBidParams) => {
      return await auctionAPI.updateAutoBid(auctionId, updateAutoBid);
    },

    onError: (error) => {
      handleApiError(error, router);
    },

    onSuccess: (data, variables) => {
      toast.success("Auto bid updated successfully!");

      if (variables.updateAutoBid.isActive === false) {
        queryClient.setQueryData(["isAutoBidSet", variables.auctionId], false);
        queryClient.removeQueries({
          queryKey: ["userAutoBid", variables.auctionId],
          exact: true,
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["userAutoBid", variables.auctionId],
          refetchType: "active",
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["isAutoBidSet", variables.auctionId],
        refetchType: "active",
      });
    },
  });
};

export default useUpdateAutoBid;
