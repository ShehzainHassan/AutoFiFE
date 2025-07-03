import { CompareVehicle, VehicleFeatures } from "@/interfaces/vehicle";
export type CompareFeaturesContainerProps = {
  vehicle1: CompareVehicle;
  vehicle2: CompareVehicle;
};
type ExpandedSections = {
  Overview: boolean;
  Drivetrain: boolean;
  Engine: boolean;
  "Fuel Economy": boolean;
  Measurements: boolean;
  Performance: boolean;
  Options: boolean;
};

export type CompareFeaturesViewProps = {
  vehicle1: CompareVehicle;
  vehicle2: CompareVehicle;
  features1: VehicleFeatures;
  features2: VehicleFeatures;
  expandedSections: ExpandedSections;
  toggleSection: (section: keyof ExpandedSections) => void;
};

export type FeatureCategory = keyof VehicleFeatures["features"];
export type RowDefinition<K extends FeatureCategory> = {
  label: string;
  key: K;
  subKey: keyof VehicleFeatures["features"][K];
};

export type FeatureSectionProps<K extends FeatureCategory> = {
  title: string;
  expanded: boolean;
  toggle: () => void;
  rows: RowDefinition<K>[];
  features1: VehicleFeatures;
  features2: VehicleFeatures;
};
export type OptionProps = {
  expanded: boolean;
  toggle: () => void;
  features1: VehicleFeatures;
  features2: VehicleFeatures;
};
export type OverviewSectionProps = {
  expanded: boolean;
  toggle: () => void;
  features1: VehicleFeatures;
  features2: VehicleFeatures;
  vehicle1: CompareVehicle;
  vehicle2: CompareVehicle;
};
export type VehicleHeaderProps = {
  vehicle1: CompareVehicle;
  vehicle2: CompareVehicle;
  features1: VehicleFeatures;
  features2: VehicleFeatures;
};
