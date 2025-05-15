"use client";
import headings from "@/styles/typography.module.css";
import footerClasses from "../Footer/footer.module.css";
import HorizontalTabs from "../horizontal-tabs";
import SectionTitle from "../section-title";
import Wrapper from "../wrapper";
import classes from "./shop.module.css";
import { useState } from "react";
export default function Shop() {
  const tabs = [
    "New Cars For Sale",
    "Used Cars For Sale",
    "Browse By Type",
    "Browse By Brand",
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className={classes.container}>
      <SectionTitle title="Shop BoxCar Your Way" buttonText="View More" />
      <Wrapper>
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />

        <div className={`${footerClasses.list} ${classes.list}`}>
          <div className={footerClasses.subList}>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Ford Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Honda Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Hyundai Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Infinite Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jaguar Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jeep Cars
            </p>
          </div>
          <div className={footerClasses.subList}>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Ford Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Honda Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Hyundai Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Infinite Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jaguar Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jeep Cars
            </p>
          </div>
          <div className={footerClasses.subList}>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Ford Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Honda Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Hyundai Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Infinite Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jaguar Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jeep Cars
            </p>
          </div>
          <div className={footerClasses.subList}>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Ford Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Honda Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Hyundai Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Infinite Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jaguar Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jeep Cars
            </p>
          </div>
          <div className={footerClasses.subList}>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Ford Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Honda Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Hyundai Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Infinite Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jaguar Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jeep Cars
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
