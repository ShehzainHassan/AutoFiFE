"use client";
import { useState } from "react";
import classes from "./tabs.module.css";
import headings from "@/styles/typography.module.css";

type TabProps = {
  tabs: string[];
  tabColor?: string;
  selectedTabColor?: string;
  selectedTabBorderColor?: string;
  borderColor?: string;
};

export default function HorizontalTabs({
  tabs,
  tabColor = "var(--color-white100)",
  selectedTabColor = "var(--color-white100)",
  selectedTabBorderColor = "var(--color-white100)",
  borderColor = "var(--color-white100)",
}: TabProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      className={classes.tabContainer}
      style={{ borderBottom: `1px solid ${borderColor}` }}>
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => setActiveTab(index)}
          className={`${classes.tab} ${headings.tabText}`}
          style={{
            color: activeTab === index ? selectedTabColor : tabColor,
            borderBottom:
              activeTab === index
                ? `2px solid ${selectedTabBorderColor}`
                : "none",
          }}>
          {tab}
        </button>
      ))}
    </div>
  );
}
