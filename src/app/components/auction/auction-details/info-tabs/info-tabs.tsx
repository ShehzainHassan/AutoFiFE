"use client";
import HorizontalTabs from "@/app/components/horizontal-tabs/horizontal-tabs";
import { useState } from "react";
import classes from "./info-tabs.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { LIGHT_BLUE_BLACK_THEME } from "@/styles/tab-styles";

export default function InfoTabs() {
  const tabs = ["Overview", "Specs", "History"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Overview":
        return (
          <>
            <h2>Overview</h2>
            <p className={classes.textContainer}>
              This 2018 Honda Civic is a well-maintained vehicle with a clean
              title and low mileage. It features a fuel-efficient engine,
              comfortable interior, and modern technology. Recent maintenance
              includes new tires and brakes. The car is in excellent condition
              and ready for its next owner.
            </p>
          </>
        );
      case "Specs":
        return (
          <>
            <h2>Specifications</h2>
            <p className={classes.textContainer}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              imperdiet, nisl nec vehicula gravida, nunc lacus consequat lorem,
              in sodales sapien sem nec nisi. Donec dignissim placerat urna, nec
              viverra sem laoreet non.
            </p>
          </>
        );
      case "History":
        return (
          <>
            <h2>Vehicle History</h2>
            <p className={classes.textContainer}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              consectetur, sem at sagittis vehicula, ligula erat tincidunt
              magna, sit amet volutpat ligula odio non quam. Ut suscipit felis
              non magna pulvinar, nec laoreet justo sodales.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={classes.container}>
      <ThemeProvider value={LIGHT_BLUE_BLACK_THEME}>
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />
      </ThemeProvider>
      <div className={classes.selectedTabContainer}>{renderTabContent()}</div>
    </div>
  );
}
