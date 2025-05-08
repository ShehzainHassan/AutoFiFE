"use client";
import { useVehicle } from "@/contexts/vehicleContext";
import headings from "@/styles/typography.module.css";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { makeOptions, modelOptions } from "../../../constants";
import ButtonPrimary from "../components/Buttons/Primary/primary";
import DropdownWithLabel from "../components/Dropdown with Label/dropdown";
import FAQs from "../components/FAQs/faqs";
import Filters from "../components/Filters/Filters";
import Footer from "../components/Footer/footer";
import HorizontalTabs from "../components/Horizontal Tabs/tabs";
import InputWithLabel from "../components/Input With Label/input";
import Navbar from "../components/Navbar/navbar";
import ResultCard from "../components/Result Card/result-card";
import SortBy from "../components/Sort By/sort-by";
import Wrapper from "../components/Wrapper/wrapper";
import classes from "./page.module.css";

export default function Search() {
  const tabs = ["Car", "Body style", "Price"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const carInfoTabs = ["FAQs", "Reviews", "Variants", "Pricing"];
  const [selectedInfoTab, setSelectedInfoTab] = useState(carInfoTabs[0]);
  const { make, model, setMake, setModel } = useVehicle();
  const searchParams = useSearchParams();
  const defaultModel = searchParams.get("model");
  const router = useRouter();
  const handleSearch = () => {
    router.push(`/search?make=${make}&model=${model}&price=All Prices`);
  };
  useEffect(() => {
    if (defaultModel) {
      setModel(defaultModel);
    }
  }, [defaultModel, setModel]);
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
                value={make}
                onChange={setMake}
                placeholder="Make"
                options={makeOptions}
              />
              <DropdownWithLabel
                label="Model"
                value={model}
                onChange={setModel}
                placeholder="Model"
                options={modelOptions}
              />
              <InputWithLabel label="Postcode" />

              <div className={classes.btn}>
                <ButtonPrimary
                  btnText="Search"
                  backgroundColor="var(--color-blue400)"
                  textColor="var(--color-white100)"
                  padding="12.5px 98px"
                  hoverColor="var(--color-blue600)"
                  onClick={handleSearch}
                />
              </div>
            </div>
            <Filters />
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
              <SortBy />
            </div>
            <div className={classes.resultCards}>
              <ResultCard
                carImg="/images/Bentley-Arnage4.4.png"
                miles={102850}
                price="$11,995"
              />
              <ResultCard
                carImg="/images/Bentley-Arnage4.4.png"
                miles={102850}
                price="$11,995"
              />
              <ResultCard
                carImg="/images/Bentley-Arnage4.4.png"
                miles={102850}
                price="$11,995"
              />
              <ResultCard
                carImg="/images/Bentley-Arnage4.4.png"
                miles={102850}
                price="$11,995"
              />
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
