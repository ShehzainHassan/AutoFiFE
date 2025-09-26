"use client";
import vehicleAPI from "@/api/vehicleAPI";
import { ListingNotification } from "@/interfaces/vehicle";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useListingNotification = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (notification: ListingNotification) => {
      const response = await vehicleAPI.addListingNotification(notification);
      return response;
    },

    onMutate: async (newNotification: ListingNotification) => {
      await queryClient.cancelQueries({ queryKey: ["listingNotifications"] });

      const previousNotifications = queryClient.getQueryData([
        "listingNotifications",
      ]);

      queryClient.setQueryData(
        ["listingNotifications"],
        (old: ListingNotification[] = []) => [
          ...old,
          { ...newNotification, createdAt: new Date().toISOString() },
        ]
      );

      return { previousNotifications };
    },

    onError: (_err, _newNotification, context) => {
      queryClient.setQueryData(
        ["listingNotifications"],
        context?.previousNotifications
      );
      handleApiError(_err, router);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["listingNotifications"] });
    },

    onSuccess: () => {
      toast.success("Email added successfully!");
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export default useListingNotification;
