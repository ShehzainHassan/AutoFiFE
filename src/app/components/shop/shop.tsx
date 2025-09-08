"use client";

import { useCallback, useMemo, useState } from "react";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import SectionTitle from "../section-title/section-title";
import VehicleList from "./vehicle-list/vehicle-list";
import classes from "./shop.module.css";

const TAB_LABELS = [
  "New Cars For Sale",
  "Used Cars For Sale",
  "Browse By Type",
  "Browse By Brand",
];

export default function Shop() {
  const tabs = useMemo(() => TAB_LABELS, []);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleTabChange = useCallback((tab: string) => {
    setSelectedTab(tab);
  }, []);

  return (
    <section className={classes.container} aria-labelledby="shop-title">
      <div className={classes.shopHeader}>
        <SectionTitle
          title="Shop BoxCar Your Way"
          buttonText="View More"
          titleId="shop-title"
        />
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
        />
      </div>
      <VehicleList />
    </section>
  );
}
