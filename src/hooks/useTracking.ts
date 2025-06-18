"use client";
import userAPI from "@/api/userAPI";
import { useMutation } from "@tanstack/react-query";

const useTracking = () => {
  return useMutation({
    mutationFn: async ({
      vehicleId,
      interactionType,
    }: {
      vehicleId: number;
      interactionType: string;
    }) => {
      return await userAPI.addUserInteraction(vehicleId, interactionType);
    },
    onError: (error) => console.error("Tracking failed ", error),
  });
};

export default useTracking;
