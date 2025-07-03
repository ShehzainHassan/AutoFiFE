import { Options } from "@/interfaces/dropdown-options";

export interface CompareVehicle {
  make: string;
  model: string;
  year: string;
  show: boolean;
}

export interface VehicleSelectorProps {
  vehicle: CompareVehicle;
  onChange: (vehicle: CompareVehicle) => void;
  onRemove: () => void;
}

export interface VehicleSelectorUIProps extends VehicleSelectorProps {
  makeOptions: Options[];
  modelOptions: Options[];
  yearOptions: Options[];
  onMakeChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onYearChange: (value: string) => void;
}
