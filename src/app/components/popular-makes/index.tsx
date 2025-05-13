"use client";
import { useState } from "react";
import HorizontalTabs from "../horizontal-tabs";
import CarSwiper from "../popular-makes-swiper";
import SectionTitle from "../section-title";
import Wrapper from "../wrapper";
import classes from "./popular-makes.module.css";
import { usePopularMakes } from "@/contexts/popularMakesContext";
export default function PopularMakes() {
  const tabs = ["Audi", "Ford", "Mercedes-Benz"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const { setMake_Popular } = usePopularMakes();
  return (
    <div className={classes.container}>
      <SectionTitle
        title="Popular Makes"
        buttonText="View All"
        backgroundColor="var(--color-black100)"
        color="var(--color-white100)"
      />
      <Wrapper padding="0 0 115px 265px">
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => {
            setSelectedTab(tab);
            setMake_Popular(tab);
          }}
        />
        <CarSwiper />
      </Wrapper>
    </div>
  );
}
