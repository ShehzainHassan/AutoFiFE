"use client";
import { MAX_MILEAGE, MIN_MILEAGE } from "@/constants";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { useState } from "react";
import MileageExpanded from "./mileage-expanded";

export default function MileageExpandedContainer() {
  const { stagedSearch, setStagedSearch } = useSearch();
  const [localMileage, setLocalMileage] = useState(
    stagedSearch.stagedMileage === null
      ? MAX_MILEAGE
      : stagedSearch.stagedMileage
  );

  const getDisplayText = () => {
    if (localMileage <= MIN_MILEAGE) return `${MIN_MILEAGE} miles`;
    if (localMileage >= MAX_MILEAGE) return "Any";
    return `${localMileage.toLocaleString()} miles or fewer`;
  };

  const handleChange = (
    _: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    setLocalMileage(value as number);
  };

  const handleChangeCommitted = (
    _: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    const newMileage = value as number;
    setStagedSearch((prev) => ({
      ...prev,
      stagedMileage: newMileage >= MAX_MILEAGE ? null : newMileage,
    }));
  };

  const handleClear = () => {
    setLocalMileage(MAX_MILEAGE);
    setStagedSearch((prev) => ({
      ...prev,
      stagedMileage: null,
    }));
  };

  return (
    <MileageExpanded
      localMileage={localMileage}
      getDisplayText={getDisplayText}
      handleChange={handleChange}
      handleChangeCommitted={handleChangeCommitted}
      handleClear={handleClear}
    />
  );
}
