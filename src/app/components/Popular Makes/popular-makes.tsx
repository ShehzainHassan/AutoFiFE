"use client";
import { useState } from "react";
import HorizontalTabs from "../Horizontal Tabs/tabs";
import CarSwiper from "../Popular Makes Swiper/popular-makes-swiper";
import SectionTitle from "../Section Title/section-title";
import Wrapper from "../Wrapper/wrapper";
import classes from "./popular-makes.module.css";
import { useVehicleByMake } from "@/contexts/vehicleByMakeContext";
export default function PopularMakes() {
  const tabs = ["Audi", "Ford", "Mercedes-Benz"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const { setMake } = useVehicleByMake();
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
            setMake(tab);
          }}
        />
        <CarSwiper />
      </Wrapper>
    </div>
  );
}
