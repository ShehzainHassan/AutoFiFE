import {
  FeatureSection,
  OptionsSection,
  OverviewSection,
  VehicleHeader,
} from "@/app/components";
import classes from "./compare-features.module.css";
import { CompareFeaturesViewProps } from "./compare-features.types";

export default function CompareFeatures({
  vehicle1,
  vehicle2,
  features1,
  features2,
  expandedSections,
  toggleSection,
}: CompareFeaturesViewProps) {
  return (
    <div className={classes.container}>
      <VehicleHeader
        vehicle1={vehicle1}
        vehicle2={vehicle2}
        features1={features1}
        features2={features2}
      />
      <OverviewSection
        expanded={expandedSections.Overview}
        toggle={() => toggleSection("Overview")}
        features1={features1}
        features2={features2}
        vehicle1={vehicle1}
        vehicle2={vehicle2}
      />
      <FeatureSection
        title="Drivetrain"
        expanded={expandedSections.Drivetrain}
        toggle={() => toggleSection("Drivetrain")}
        features1={features1}
        features2={features2}
        rows={[
          { label: "Type", key: "drivetrain", subKey: "type" },
          { label: "Transmission", key: "drivetrain", subKey: "transmission" },
        ]}
      />
      <FeatureSection
        title="Engine"
        expanded={expandedSections.Engine}
        toggle={() => toggleSection("Engine")}
        features1={features1}
        features2={features2}
        rows={[
          { label: "Type", key: "engine", subKey: "type" },
          { label: "Size", key: "engine", subKey: "size" },
          { label: "Horsepower", key: "engine", subKey: "horsepower" },
          { label: "Torque Ft/LBS", key: "engine", subKey: "torqueFtLBS" },
          { label: "Torque RPM", key: "engine", subKey: "torqueRPM" },
          { label: "Valves", key: "engine", subKey: "valves" },
          { label: "Cam Type", key: "engine", subKey: "camType" },
        ]}
      />

      <FeatureSection
        title="Fuel Economy"
        expanded={expandedSections["Fuel Economy"]}
        toggle={() => toggleSection("Fuel Economy")}
        features1={features1}
        features2={features2}
        rows={[
          {
            label: "Fuel Tank Size",
            key: "fuelEconomy",
            subKey: "fuelTankSize",
          },
          { label: "City MPG", key: "fuelEconomy", subKey: "cityMPG" },
          { label: "Highway MPG", key: "fuelEconomy", subKey: "highwayMPG" },
          { label: "Combined MPG", key: "fuelEconomy", subKey: "combinedMPG" },
          {
            label: "CO₂ Emissions",
            key: "fuelEconomy",
            subKey: "cO2Emissions",
          },
        ]}
      />

      <FeatureSection
        title="Measurements"
        expanded={expandedSections.Measurements}
        toggle={() => toggleSection("Measurements")}
        features1={features1}
        features2={features2}
        rows={[
          { label: "Doors", key: "measurements", subKey: "doors" },
          {
            label: "Max Seating",
            key: "measurements",
            subKey: "maximumSeating",
          },
          { label: "Height (in)", key: "measurements", subKey: "heightInches" },
          { label: "Width (in)", key: "measurements", subKey: "widthInches" },
          { label: "Length (in)", key: "measurements", subKey: "lengthInches" },
          {
            label: "Wheelbase (in)",
            key: "measurements",
            subKey: "wheelbaseInches",
          },
          {
            label: "Ground Clearance (in)",
            key: "measurements",
            subKey: "groundClearance",
          },
          {
            label: "Cargo Capacity (cu ft)",
            key: "measurements",
            subKey: "cargoCapacityCuFt",
          },
          {
            label: "Curb Weight (lbs)",
            key: "measurements",
            subKey: "curbWeightLBS",
          },
        ]}
      />

      <FeatureSection
        title="Performance"
        expanded={expandedSections.Performance}
        toggle={() => toggleSection("Performance")}
        features1={features1}
        features2={features2}
        rows={[
          {
            label: "Zero To 60 MPH",
            key: "performance",
            subKey: "zeroTo60MPH",
          },
        ]}
      />

      <OptionsSection
        expanded={expandedSections.Options}
        toggle={() => toggleSection("Options")}
        features1={features1}
        features2={features2}
      />
    </div>
  );
}
