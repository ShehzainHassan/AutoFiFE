"use client";
import { useState } from "react";
import ButtonPrimary from "../components/Buttons/Primary/primary";
import DropdownWithLabel from "../components/Dropdown with Label/dropdown";
import Expandable from "../components/Expandable Dropdown/expandable";
import HorizontalTabs from "../components/Horizontal Tabs/tabs";
import classes from "./page.module.css";
import ResultCard from "../components/Result Card/result-card";
export default function Search() {
  const tabs = ["Car", "Body style", "Price"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const makeOptions = [
    { label: "Bentley", value: "bentley" },
    { label: "Ford", value: "ford" },
    { label: "Audi", value: "audi" },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <div className={classes.filters}>
          <HorizontalTabs
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={(tab) => setSelectedTab(tab)}
            tabColor="var(--color-gray600)"
            selectedTabColor="var(--color-blue400)"
            selectedTabBorderColor="var(--color-blue400)"
            borderColor="var(--color-gray400)"
          />
          <DropdownWithLabel
            label="Make"
            placeholder="Make"
            options={makeOptions}
          />
          <DropdownWithLabel
            label="Model"
            placeholder="Model"
            options={makeOptions}
          />

          <div className={classes.btn}>
            <ButtonPrimary
              btnText="Search"
              backgroundColor="var(--color-blue400)"
              textColor="var(--color-white100)"
              padding="12.5px 98px"
              hoverColor="var(--color-blue600)"
            />
          </div>
        </div>
        <div className={classes.expandable}>
          <Expandable title="Years" />
          <Expandable title="Location and delivery" />
          <Expandable title="Price" />
          <Expandable title="Mileage" />
          <Expandable title="Gearbox" />
          <Expandable title="Engine size" />
          <Expandable title="CO2" />
          <Expandable title="Insurance group" />
          <Expandable title="Variant" />
          <Expandable title="Days on market" />
          <Expandable title="Exterior color" />
          <Expandable title="Features" />
          <Expandable title="ULEZ compliance" />
          <Expandable title="Fuel economy" />
          <Expandable title="Price drops" roundedSides={true} />
        </div>
      </div>
      <div>
        <ResultCard />
      </div>
    </div>
  );
}
