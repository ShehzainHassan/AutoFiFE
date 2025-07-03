import useVehicleFeatures from "@/hooks/useVehicleFeatures";
import { useState } from "react";
import { CompareFeaturesContainerProps } from "./compare-features.types";
import CompareFeatures from "./compare-features";

export default function CompareFeaturesContainer({
  vehicle1,
  vehicle2,
}: CompareFeaturesContainerProps) {
  const { data: features1, isLoading: loading1 } = useVehicleFeatures(
    vehicle1.make,
    vehicle1.model,
    true
  );
  const { data: features2, isLoading: loading2 } = useVehicleFeatures(
    vehicle2.make,
    vehicle2.model,
    true
  );

  const [expandedSections, setExpandedSections] = useState({
    Overview: true,
    Drivetrain: true,
    Engine: true,
    "Fuel Economy": true,
    Measurements: true,
    Performance: true,
    Options: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (loading1 || loading2 || !features1 || !features2)
    return <p>Loading vehicle data...</p>;

  return (
    <CompareFeatures
      vehicle1={vehicle1}
      vehicle2={vehicle2}
      features1={features1}
      features2={features2}
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    />
  );
}
