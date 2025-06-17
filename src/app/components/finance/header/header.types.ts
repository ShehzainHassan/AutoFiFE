import { Vehicle } from "@/interfaces/vehicle";

export type HeaderProps = {
  prevStep: () => void;
  vehicle: Vehicle;
};
