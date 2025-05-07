"use client";
import { useState } from "react";
import ButtonPrimary from "../components/Buttons/Primary/primary";
import DropdownWithLabel from "../components/Dropdown with Label/dropdown";
import Expandable from "../components/Expandable Dropdown/expandable";
import HorizontalTabs from "../components/Horizontal Tabs/tabs";
import classes from "./page.module.css";
import ResultCard from "../components/Result Card/result-card";
import Navbar from "../components/Navbar/navbar";
import Wrapper from "../components/Wrapper/wrapper";
import Footer from "../components/Footer/footer";
import headings from "@/styles/typography.module.css";
import Image from "next/image";
import FAQs from "../components/FAQs/faqs";
import InputWithLabel from "../components/Input With Label/input";

export default function Search() {
  const tabs = ["Car", "Body style", "Price"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const makeOptions = [
    { label: "Bentley", value: "bentley" },
    { label: "Ford", value: "ford" },
    { label: "Audi", value: "audi" },
  ];
  const carInfoTabs = ["FAQs", "Reviews", "Variants", "Pricing"];
  const [selectedInfoTab, setSelectedInfoTab] = useState(carInfoTabs[0]);
  return (
    <>
      <Navbar backgroundColor="var(--color-gray600)" />
      <Wrapper padding="63px 240px">
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
              <InputWithLabel />

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
          <div className={classes.resultContainer}>
            <div className={classes.resultHeader}>
              <h1 className={headings.resultTitle}>
                Used Bentley Arnage for sale nationwide
              </h1>
              <div className={classes.resultHeaderText}>
                <p className={classes.text}>
                  See our <span className={classes.bold}>3,517</span> reviews on{" "}
                  <span className={classes.star} />
                  Trustpilot
                </p>
                <ButtonPrimary
                  imgSrc="/images/love.png"
                  btnText="Save Search"
                  textColor="var(--color-black100)"
                  border="1px solid var(--color-black100)"
                />
              </div>
            </div>
            <div className={classes.resultHeaderBottom}>
              <div className={classes.results}>
                <p className={classes.noOfResults}>17 results</p>
                <Image
                  src="/images/location.png"
                  alt="location"
                  width={12}
                  height={12}
                  className={classes.location}
                />
              </div>
              <div className={classes.sortBy}>
                <p>Sort by: </p>
                <select className={classes.select}>
                  <option value="best deals">Best deals first</option>
                </select>
              </div>
            </div>
            <div className={classes.resultCards}>
              <ResultCard />
              <ResultCard />
              <ResultCard />
              <ResultCard />
            </div>
          </div>
        </div>
        <Wrapper padding="0 60px">
          <HorizontalTabs
            tabs={carInfoTabs}
            selectedTab={selectedInfoTab}
            onTabChange={(tab) => setSelectedInfoTab(tab)}
            tabColor="var(--color-gray600)"
            borderColor="var(--color-gray500)"
            selectedTabColor="var(--color-blue400)"
            selectedTabBorderColor="var(--color-blue400)"
          />
          <FAQs />
        </Wrapper>
      </Wrapper>
      <Footer />
    </>
  );
}
