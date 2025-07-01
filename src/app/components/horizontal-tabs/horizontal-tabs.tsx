"use client";
import headings from "@/styles/typography.module.css";
import classes from "./horizontal-tabs.module.css";
import { useTheme } from "@/theme/themeContext";
import { TabProps } from "./horizontal-tabs.types";

export default function HorizontalTabs({
  tabs,
  selectedTab,
  onTabChange,
  tabColor,
  selectedTabColor,
  selectedTabBorderColor,
  borderColor,
}: TabProps) {
  const { horizontalTabs } = useTheme();
  const finalTabColor = tabColor || horizontalTabs?.tabColor;
  const finalSelectedTabColor =
    selectedTabColor || horizontalTabs?.selectedTabColor;
  const finalSelectedTabBorderColor =
    selectedTabBorderColor || horizontalTabs?.selectedTabBorderColor;
  const finalBorderColor = borderColor || horizontalTabs?.borderColor;

  return (
    <div
      className={classes.tabContainer}
      style={{ borderBottom: `1px solid ${finalBorderColor}` }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          aria-label={tab}
          onClick={() => onTabChange(tab)}
          className={`${classes.tab} ${headings.tabText}`}
          style={{
            color: selectedTab === tab ? finalSelectedTabColor : finalTabColor,
            borderBottom:
              selectedTab === tab
                ? `2px solid ${finalSelectedTabBorderColor}`
                : "none",
            background: "transparent",
          }}>
          {tab}
        </button>
      ))}
    </div>
  );
}
