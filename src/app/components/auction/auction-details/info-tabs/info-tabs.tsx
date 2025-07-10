"use client";
import HorizontalTabs from "@/app/components/horizontal-tabs/horizontal-tabs";
import { useState } from "react";
import classes from "./info-tabs.module.css";
export default function InfoTabs() {
  const tabs = ["Overview", "Specs", "History"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div className={classes.container}>
      <div>
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />
      </div>
      <div className={classes.selectedTabContainer}>
        <h2>Overview</h2>
        <p className={classes.textContainer}>
          This 2018 Honda Civic is a well-maintained vehicle with a clean title
          and low mileage. It features a fuel-efficient engine, comfortable
          interior, and modern technology. Recent maintenance includes new tires
          and brakes. The car is in excellent condition and ready for its next
          owner.
        </p>
      </div>
    </div>
  );
}
