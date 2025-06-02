"use client";
import { useState } from "react";
import AllVehiclesSwiper from "../all-vehicle-swiper";
import HorizontalTabs from "../horizontal-tabs";
import SectionTitle from "../section-title";
import Wrapper from "../wrapper";
import classes from "./all-vehicles.module.css";
import { useRouter } from "next/navigation";
import { convertArrayToString, parseStatus } from "@/utilities/utilities";
import { MAX_YEAR, MIN_YEAR } from "@/constants";
import { useSearch } from "@/contexts/carSearchContext";
export default function ExploreVehicles() {
  const TABS = ["In Stock", "New Cars", "Used Cars"];
  const [selectedTab, setSelectedTab] = useState<string>(TABS[0]);
  const router = useRouter();
  const {
    mileage,
    searchParams,
    setMake,
    setModel,
    setSearchParams,
    setExpandedSections,
    setStatus,
    setStartYear,
    setEndYear,
    setSelectedGearboxes,
    setSelectedColors,
  } = useSearch();
  const handleViewAll = () => {
    const parsedStatus = parseStatus(selectedTab);
    setSearchParams({
      ...searchParams,
      make: "Any_Makes",
      model: "Any_Models",
      offset: 0,
      status: parsedStatus,
      mileage,
      startYear: MIN_YEAR,
      endYear: MAX_YEAR,
      gearbox: convertArrayToString([]),
      selectedColor: convertArrayToString([]),
    });
    setExpandedSections(new Set());

    setMake("Any_Makes");
    setModel("Any_Models");
    setStatus(parsedStatus);
    setStartYear(MIN_YEAR);
    setEndYear(MAX_YEAR);
    setSelectedColors([]);
    setSelectedGearboxes([]);

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
        <Wrapper padding="0 0 115px 265px">
          <div className={classes.space}>
            <HorizontalTabs
              tabs={TABS}
              selectedTab={selectedTab}
              onTabChange={(tab) => {
                setSelectedTab(tab);
              }}
            />
          </div>
          <AllVehiclesSwiper
            vehicleStatus={
              selectedTab === TABS[0]
                ? null
                : selectedTab === TABS[1]
                ? "NEW"
                : "USED"
            }
          />
        </Wrapper>
      </div>
    </>
  );
}
