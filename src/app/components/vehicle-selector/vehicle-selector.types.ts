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
