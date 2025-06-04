"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { WHITE_THEME } from "@/styles/tab-styles";
import { ThemeProvider } from "@/theme/themeContext";
import { convertArrayToString } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./popular-makes.module.css";
import { MAX_YEAR, MIN_YEAR } from "@/constants";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import SectionTitle from "../section-title/section-title";
import Wrapper from "../wrapper/wrapper";
import PopularMakesSwiper from "../popular-makes-swiper/popular-makes-swiper";
export default function PopularMakes() {
  const {
    mileage,
    searchParams,
    setMake,
    setModel,
    setSearchParams,
    setExpandedSections,
    setStatus,
    setStartYear,
    setEndYear,
    setSelectedGearboxes,
    setSelectedColors,
  } = useSearch();
  const tabs = ["Audi", "Ford", "Mercedes-Benz"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const router = useRouter();
  const handleViewAll = () => {
    setSearchParams({
      ...searchParams,
      make: selectedTab,
      offset: 0,
      model: "Any_Models",
      status: "Any",
      mileage,
      startYear: MIN_YEAR,
      endYear: MAX_YEAR,
      gearbox: convertArrayToString([]),
      selectedColor: convertArrayToString([]),
    });
    setExpandedSections(new Set());

    setMake(selectedTab);
    setModel("Any_Models");
    setStatus("Any");
    setStartYear(MIN_YEAR);
    setEndYear(MAX_YEAR);
    setSelectedColors([]);
    setSelectedGearboxes([]);
    router.push(`/search?make=${selectedTab}&model=Any_Models`);
  };
  return (
    <div className={classes.container}>
      <SectionTitle
        title="Popular Makes"
        buttonText="View All"
        onClick={handleViewAll}
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
