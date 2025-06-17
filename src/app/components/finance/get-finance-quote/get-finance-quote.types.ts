import { Vehicle } from "@/interfaces/vehicle";

export type GetFinanceQuoteProps = {
  vehicle: Vehicle;
  nextStep: () => void;
};
