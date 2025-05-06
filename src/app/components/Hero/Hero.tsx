"use client";
import headings from "@/styles/typography.module.css";
import FeaturedIcon from "../Featured Icons/featured";
import HorizontalTabs from "../Horizontal Tabs/tabs";
import Navbar from "../Navbar/navbar";
import SearchCars from "../Search Form/search-cars";
import classes from "./hero.module.css";
import useTranslation from "@/i18n";
import { useState } from "react";
export default function Hero() {
  const { t } = useTranslation();
  const tabs = ["All", "New", "Used"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

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
            <HorizontalTabs
              tabs={tabs}
              selectedTab={selectedTab}
              onTabChange={(tab) => setSelectedTab(tab)}
              borderColor="transparent"
            />
            <SearchCars />
          </div>
        </div>
        <div className={classes.textContainer}>
          <p className={classes.browse}>Or Browse Featured Model</p>
          <div className={classes.modelsIconContainer}>
            <FeaturedIcon
              imgSrc="/images/SUV.png"
              model={t("hero.carModels.suv")}
            />
            <FeaturedIcon
              imgSrc="/images/Sedan.png"
              model={t("hero.carModels.sedan")}
            />
            <FeaturedIcon
              imgSrc="/images/Hatchback.png"
              model={t("hero.carModels.hatchback")}
            />
            <FeaturedIcon
              imgSrc="/images/Coupe.png"
              model={t("hero.carModels.coupe")}
            />
            <FeaturedIcon
              imgSrc="/images/Hybrid.png"
              model={t("hero.carModels.hybrid")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
