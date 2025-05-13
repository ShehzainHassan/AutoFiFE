"use client";
import { useVehicleResult } from "@/contexts/vehicleResultsContext";
import useTranslation from "@/i18n";
import headings from "@/styles/typography.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { featuredModels } from "../../../../constants";
import FeaturedIcon from "../featured-icons";
import HorizontalTabs from "../horizontal-tabs";
import Navbar from "../navbar";
import SearchCars from "../search-form";
import classes from "./hero.module.css";
import { useVehicle } from "@/contexts/vehicleContext";
export default function Hero() {
  const { t } = useTranslation();
  const router = useRouter();
  const tabs = ["All", "New", "Used"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const { setMakeGlobal, setModel } = useVehicle();
  const { fetchVehiclesByModel } = useVehicleResult();
  const handleCarModelClick = (model: string) => {
    const selectedMake = "Any Makes";
    setModel(model);
    setMakeGlobal(selectedMake);
    fetchVehiclesByModel(model, 0);
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
            {featuredModels.map((model) => (
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
