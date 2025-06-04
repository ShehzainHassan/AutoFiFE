"use client";
import { FEATURED_MODELS } from "@/constants";
import useTranslation from "@/i18n";
import headings from "@/styles/typography.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./hero.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { getMakeByModel } from "@/utilities/utilities";
import { WHITE_THEME } from "@/styles/tab-styles";
import FeaturedIcon from "../featured-icons/featured-icons";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import SearchForm from "../search-form/search-form";
import Navbar from "../navbar/navbar";
export default function Hero() {
  const { t } = useTranslation();
  const router = useRouter();
  const tabs = ["All", "New", "Used"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const {
    searchParams,
    setMake,
    setModel,
    setStartPrice,
    setEndPrice,
    setSearchParams,
  } = useSearch();
  const handleCarModelClick = (model: string) => {
    const make = getMakeByModel(model);
    setMake(make);
    setModel(model);
    setStartPrice(null);
    setEndPrice(null);
    setSearchParams({
      ...searchParams,
      make,
      model,
    });
    router.push(`/search?make=${make}&model=${model}`);
  };

  return (
    <div className={classes.hero}>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <p className={`${classes.shortText} ${classes.white}`}>
            {t("hero.subHeading")}
          </p>
          <p className={`${headings.title} ${classes.white}`}>
            {t("hero.title")}
          </p>
          <div className={classes.searchContainer}>
            <ThemeProvider value={WHITE_THEME}>
              <HorizontalTabs
                tabs={tabs}
                selectedTab={selectedTab}
                onTabChange={(tab) => setSelectedTab(tab)}
                borderColor="transparent"
              />
            </ThemeProvider>
            <SearchForm statusTab={selectedTab} />
          </div>
        </div>
        <div className={classes.textContainer}>
          <p className={classes.browse}>Or Browse Featured Model</p>
          <div className={classes.modelsIconContainer}>
            {FEATURED_MODELS.map((model) => (
              <FeaturedIcon
                key={model.id}
                imgSrc={model.imgSrc}
                model={model.value}
                onClick={() => handleCarModelClick(model.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
