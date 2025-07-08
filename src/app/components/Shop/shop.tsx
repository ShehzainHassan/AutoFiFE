"use client";
import { useState } from "react";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import SectionTitle from "../section-title/section-title";
import classes from "./shop.module.css";
import VehicleList from "./vehicle-list/vehicle-list";
export default function Shop() {
  const tabs = [
    "New Cars For Sale",
    "Used Cars For Sale",
    "Browse By Type",
    "Browse By Brand",
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className={classes.container}>
      <div className={classes.shopHeader}>
        <SectionTitle title="Shop BoxCar Your Way" buttonText="View More" />
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />
      </div>
      <VehicleList />
    </div>
  );
}
