"use client";
import { MAX_YEAR, MIN_YEAR } from "@/constants";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { WHITE_THEME } from "@/styles/tab-styles";
import { ThemeProvider } from "@/theme/themeContext";
import { convertArrayToString } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import PopularMakesSwiper from "../popular-makes-swiper/popular-makes-swiper";
import SectionTitle from "../section-title/section-title";
import classes from "./popular-makes.module.css";
export default function PopularMakes() {
  const {
    mainSearch,
    searchParams,
    setSearchParams,
    setExpandedSections,
    setMainSearch,
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
      mileage: mainSearch.mileage,
      startYear: MIN_YEAR,
      endYear: MAX_YEAR,
      gearbox: convertArrayToString([]),
      selectedColor: convertArrayToString([]),
    });
    setExpandedSections(new Set());

    setMainSearch({
      ...mainSearch,
      make: selectedTab,
      model: "Any_Models",
      status: "Any",
      startYear: MIN_YEAR,
      endYear: MAX_YEAR,
      selectedColors: [],
      selectedGearboxes: [],
    });
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
      <ThemeProvider value={WHITE_THEME}>
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => {
            setSelectedTab(tab);
          }}
        />
      </ThemeProvider>
      <div className={classes.popularMakesSwiperContainer}>
        <PopularMakesSwiper make={selectedTab} />
      </div>
    </div>
  );
}
