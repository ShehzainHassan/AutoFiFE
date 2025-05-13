"use client";
import headings from "@/styles/typography.module.css";
import classes from "./horizontal-tabs.module.css";

type TabProps = {
  tabs: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
  tabColor?: string;
  selectedTabColor?: string;
  selectedTabBorderColor?: string;
  borderColor?: string;
};

export default function HorizontalTabs({
  tabs,
  selectedTab,
  onTabChange,
  tabColor = "var(--color-white100)",
  selectedTabColor = "var(--color-white100)",
  selectedTabBorderColor = "var(--color-white100)",
  borderColor = "var(--color-white100)",
}: TabProps) {
  return (
    <div
      className={classes.tabContainer}
      style={{ borderBottom: `1px solid ${borderColor}` }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`${classes.tab} ${headings.tabText}`}
          style={{
            color: selectedTab === tab ? selectedTabColor : tabColor,
            borderBottom:
              selectedTab === tab
                ? `2px solid ${selectedTabBorderColor}`
                : "none",
          }}>
          {tab}
        </button>
      ))}
    </div>
  );
}
