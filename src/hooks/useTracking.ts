"use client";
import userAPI from "@/api/userAPI";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
const useTracking = () => {
  return useMutation({
    mutationFn: async ({
      vehicleId,
      interactionType,
    }: {
      vehicleId: number;
      interactionType: string;
    }) => {
      const userId = Cookies.get("userId");
      return await userAPI.addUserInteraction(
        vehicleId,
        interactionType,
        Number(userId)
      );
    },
    onError: (error) => console.error("Tracking failed ", error),
  });
};

export default useTracking;
