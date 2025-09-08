"use client";
import { DEFAULT_MAKE, DEFAULT_MODEL, MAX_YEAR, MIN_YEAR } from "@/constants";
import { useSearch } from "@/contexts/car-search-context";
import { convertArrayToString, parseStatus } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AllVehiclesView from "./all-vehicles-view";

export default function AllVehicles() {
  const TABS = ["In Stock", "New Cars", "Used Cars"];
  const [selectedTab, setSelectedTab] = useState<string>(TABS[0]);
  const router = useRouter();

  const {
    mainSearch,
    searchParams,
    setSearchParams,
    setExpandedSections,
    setMainSearch,
  } = useSearch();

  const handleViewAll = () => {
    const parsedStatus = parseStatus(selectedTab);

    setSearchParams({
      ...searchParams,
      make: DEFAULT_MAKE,
      model: DEFAULT_MODEL,
      offset: 0,
      status: parsedStatus,
      mileage: mainSearch.mileage,
      startYear: MIN_YEAR,
      endYear: MAX_YEAR,
      gearbox: convertArrayToString([]),
      selectedColor: convertArrayToString([]),
    });

    setExpandedSections(new Set());

    setMainSearch((prev) => ({
      ...prev,
      make: DEFAULT_MAKE,
      model: DEFAULT_MODEL,
      status: parsedStatus,
      startYear: MIN_YEAR,
      endYear: MAX_YEAR,
      selectedColors: [],
      selectedGearboxes: [],
    }));

    router.push(
      `/search?make=${selectedTab}&model=${DEFAULT_MODEL}&status=${parsedStatus}`
    );
  };

  return (
    <AllVehiclesView
      tabs={TABS}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      onViewAll={handleViewAll}
    />
  );
}
