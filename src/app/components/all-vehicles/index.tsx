"use client";
import { useState } from "react";
import AllVehiclesSwiper from "../all-vehicle-swiper";
import HorizontalTabs from "../horizontal-tabs";
import SectionTitle from "../section-title";
import Wrapper from "../wrapper";
import classes from "./all-vehicles.module.css";
export default function ExploreVehicles() {
  const TABS = ["In Stock", "New Cars", "Used Cars"];
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  return (
    <>
      <div className={classes.container}>
        <SectionTitle
          title="Explore All Vehicles"
          buttonText="View All"
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
          <AllVehiclesSwiper />
        </Wrapper>
      </div>
    </>
  );
}
