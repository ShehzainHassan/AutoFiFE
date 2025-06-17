"use client";
import vehicleAPI from "@/api/vehicleAPI";
import { Questionnaire } from "@/interfaces/questionnaire";
import { useMutation } from "@tanstack/react-query";

const useSaveQuestionnaire = () => {
  return useMutation({
    mutationFn: async ({
      questionnaire,
      vehicleId,
    }: {
      questionnaire: Questionnaire;
      vehicleId: number;
    }) => {
      return await vehicleAPI.saveQuestionnaire(questionnaire, vehicleId);
    },
  });
};
export default useSaveQuestionnaire;
