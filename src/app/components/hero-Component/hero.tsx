"use client";
import { FEATURED_MODELS } from "@/constants";
import useTranslation from "@/i18n";
import { WHITE_THEME } from "@/styles/tab-styles";
import { ThemeProvider } from "@/theme/themeContext";
import FeaturedIcon from "../featured-icons/featured-icons";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import NavbarContainer from "../navbar/navbar-container";
import classes from "./hero.module.css";
import { HeroProps } from "./hero.types";
import { SearchFormContainer } from "../search-form";

export default function Hero({
  tabs,
  selectedTab,
  setSelectedTab,
  handleCarModelClick,
}: HeroProps) {
  const { t } = useTranslation();
  return (
    <div className={classes.hero}>
      <NavbarContainer />
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
            <SearchFormContainer statusTab={selectedTab} />
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
