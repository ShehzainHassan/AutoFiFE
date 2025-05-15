"use client";
import { useState } from "react";
import HorizontalTabs from "../horizontal-tabs";
import PopularMakesSwiper from "../popular-makes-swiper";
import SectionTitle from "../section-title";
import Wrapper from "../wrapper";
import classes from "./popular-makes.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { WHITE_THEME } from "@/constants";
export default function PopularMakes() {
  const tabs = ["Audi", "Ford", "Mercedes-Benz"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div className={classes.container}>
      <SectionTitle
        title="Popular Makes"
        buttonText="View All"
        backgroundColor="var(--color-black100)"
        color="var(--color-white100)"
      />
      <Wrapper padding="0 0 115px 265px">
        <ThemeProvider value={WHITE_THEME}>
          <HorizontalTabs
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={(tab) => {
              setSelectedTab(tab);
            }}
          />
        </ThemeProvider>

        <PopularMakesSwiper make={selectedTab} />
      </Wrapper>
    </div>
  );
}
