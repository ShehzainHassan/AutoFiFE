"use client";
import useTranslation from "@/i18n";
import headings from "@/styles/typography.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { featuredModels } from "../../../../constants";
import FeaturedIcon from "../Featured Icons/featured";
import HorizontalTabs from "../Horizontal Tabs/tabs";
import Navbar from "../Navbar/navbar";
import SearchCars from "../Search Form/search-cars";
import classes from "./hero.module.css";
export default function Hero() {
  const { t } = useTranslation();
  const router = useRouter();
  const tabs = ["All", "New", "Used"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const handleCarModelClick = (model: string) => {
    router.push(`/search?make=Any Makes&model=${model}&price=All Prices`);
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
              model={featuredModels[1].value}
              onClick={() => handleCarModelClick(featuredModels[1].value)}
            />
            <FeaturedIcon
              imgSrc="/images/Sedan.png"
              model={featuredModels[2].value}
              onClick={() => handleCarModelClick(featuredModels[2].value)}
            />
            <FeaturedIcon
              imgSrc="/images/Hatchback.png"
              model={featuredModels[3].value}
              onClick={() => handleCarModelClick(featuredModels[3].value)}
            />
            <FeaturedIcon
              imgSrc="/images/Coupe.png"
              model={featuredModels[4].value}
              onClick={() => handleCarModelClick(featuredModels[4].value)}
            />
            <FeaturedIcon
              imgSrc="/images/Hybrid.png"
              model={featuredModels[5].value}
              onClick={() => handleCarModelClick(featuredModels[5].value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
