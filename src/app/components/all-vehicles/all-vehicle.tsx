"use client";
import { MAX_YEAR, MIN_YEAR } from "@/constants";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { convertArrayToString, parseStatus } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AllVehiclesSwiper from "../all-vehicle-swiper/all-vehicle-swiper";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import SectionTitle from "../section-title/section-title";
import classes from "./all-vehicles.module.css";
export default function ExploreVehicles() {
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
      make: "Any_Makes",
      model: "Any_Models",
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
      make: "Any_Makes",
      model: "Any_Models",
      status: parsedStatus,
      startYear: MIN_YEAR,
      endYear: MAX_YEAR,
      selectedColors: [],
      selectedGearboxes: [],
    }));

    router.push(
      `/search?make=${selectedTab}&model=Any_Models&status=${parsedStatus}`
    );
  };
  return (
    <>
      <div className={classes.container}>
        <SectionTitle
          title="Explore All Vehicles"
          buttonText="View All"
          onClick={handleViewAll}
          backgroundColor="var(--color-white100)"
        />
        <div className={classes.space}>
          <HorizontalTabs
            tabs={TABS}
            selectedTab={selectedTab}
            onTabChange={(tab) => {
              setSelectedTab(tab);
            }}
          />
        </div>
        <div className={classes.vehicleSwiperContainer}>
          <AllVehiclesSwiper
            vehicleStatus={
              selectedTab === TABS[0]
                ? null
                : selectedTab === TABS[1]
                ? "NEW"
                : "USED"
            }
          />
        </div>
      </div>
    </>
  );
}
