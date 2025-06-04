"use client";
import headings from "@/styles/typography.module.css";
import footerClasses from "../footer/footer.module.css";
import classes from "./shop.module.css";
import { useState } from "react";
import useTranslation from "@/i18n";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import SectionTitle from "../section-title/section-title";
import Wrapper from "../wrapper/wrapper";
export default function Shop() {
  const tabs = [
    "New Cars For Sale",
    "Used Cars For Sale",
    "Browse By Type",
    "Browse By Brand",
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const { t } = useTranslation();
  const carsList = t("shop");
  const CarsList = () => {
    return (
      <div className={`${footerClasses.list} ${classes.list}`}>
        {Object.values(carsList).map((column, index) => (
          <div key={index} className={footerClasses.subList}>
            {Array.isArray(column) ? (
              column.map((carName, idx) => (
                <p
                  key={idx}
                  className={`${headings.criteriaText} ${footerClasses.footerText}`}>
                  {carName}
                </p>
              ))
            ) : (
              <p
                className={`${headings.criteriaText} ${footerClasses.footerText}`}>
                {column}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className={classes.container}>
      <SectionTitle title="Shop BoxCar Your Way" buttonText="View More" />
      <Wrapper>
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />
        <CarsList />
      </Wrapper>
    </div>
  );
}
