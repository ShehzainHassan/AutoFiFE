"use client";
import { useState } from "react";
import CarSwiper from "../car-swiper";
import HorizontalTabs from "../horizontal-tabs";
import SectionTitle from "../section-title";
import Wrapper from "../wrapper";
import classes from "./all-vehicles.module.css";
export default function Vehicles() {
  const tabs = ["In Stock", "New Cars", "Used Cars"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
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
              tabs={tabs}
              selectedTab={selectedTab}
              onTabChange={(tab) => {
                setSelectedTab(tab);
              }}
              tabColor="var(--color-black100)"
              selectedTabColor="var(--color-black100)"
              selectedTabBorderColor="var(--color-blue500)"
              borderColor="var(--color-gray100)"
            />
          </div>
          <CarSwiper />
        </Wrapper>
      </div>
    </>
  );
}
