"use client";
import { FEATURED_MODELS } from "@/constants";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import useTranslation from "@/i18n";
import { WHITE_THEME } from "@/styles/tab-styles";
import { ThemeProvider } from "@/theme/themeContext";
import { getMakeByModel } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FeaturedIcon from "../featured-icons/featured-icons";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import Navbar from "../navbar/navbar";
import SearchForm from "../search-form/search-form";
import classes from "./hero.module.css";
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
          <p className={classes.subTitle}>{t("hero.subHeading")}</p>
          <p className={classes.title}>{t("hero.title")}</p>
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
