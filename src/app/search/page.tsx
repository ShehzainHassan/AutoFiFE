"use client";
import { MAKE_OPTIONS } from "@/constants";
import { BLUE_THEME, WHITE_THEME } from "@/constants/button-primary-themes";
import { useSearch } from "@/contexts/carSearchContext";
import { GRAY_BLUE_THEME } from "@/styles/tab-styles";
import headings from "@/styles/typography.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { getModelOptions } from "@/utilities/utilities";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonPrimary from "../components/buttons/Primary";
import Dropdown from "../components/dropdown";
import FAQs from "../components/faqs";
import Filters from "../components/filters";
import Footer from "../components/footer";
import HorizontalTabs from "../components/horizontal-tabs";
import Input from "../components/input";
import LoadResults from "../components/load-results";
import Navbar from "../components/navbar";
import Pagination from "../components/pagination";
import SortBy from "../components/sort-by";
import Wrapper from "../components/wrapper";
import classes from "./page.module.css";

export default function Search() {
  const tabs = ["Car", "Body style", "Price"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const carInfoTabs = ["FAQs", "Reviews", "Variants", "Pricing"];
  const [selectedInfoTab, setSelectedInfoTab] = useState(carInfoTabs[0]);
  const [postCode, setPostCode] = useState<number>(0);

  const {
    make,
    model,
    price,
    startPrice,
    endPrice,
    mileage,
    startYear,
    endYear,
    searchParams,
    setMake,
    setModel,
    setSearchParams,
  } = useSearch();
  const router = useRouter();
  const handleSearchClick = () => {
    setSearchParams({
      ...searchParams,
      make,
      model,
      startPrice,
      endPrice,
      mileage,
      startYear,
      endYear,
    });
    let mileageText = "Any";
    if (mileage) {
      mileageText = `<=${mileage}`;
    }

    router.push(
      `/search?make=${make}&model=${model}&price=${price}&mileage=${mileageText}&startYear=${startYear}&endYear=${endYear}`
    );
  };

  const ShowTabs = () => {
    return (
      <ThemeProvider value={GRAY_BLUE_THEME}>
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />
      </ThemeProvider>
    );
  };
  const MakeDropdown = () => {
    return (
      <Dropdown
        value={make}
        onChange={(value) => {
          setMake(value);
          setModel("Any_Models");
        }}
        placeholder="Select make">
        <Dropdown.Label>Make</Dropdown.Label>
        <Dropdown.Select options={MAKE_OPTIONS} />
      </Dropdown>
    );
  };
  const ModelDropdown = () => {
    return (
      <Dropdown value={model} onChange={setModel} placeholder="Select model">
        <Dropdown.Label>Model</Dropdown.Label>
        <Dropdown.Select options={getModelOptions(make)} />
      </Dropdown>
    );
  };
  const InputPostcode = () => {
    return (
      <Input
        value={postCode}
        onChange={(e) => setPostCode(Number(e.target.value))}>
        <Input.Label>Postcode</Input.Label>
        <Input.Field />
      </Input>
    );
  };
  const SearchButton = () => {
    return (
      <div className={classes.btn}>
        <ThemeProvider value={BLUE_THEME}>
          <ButtonPrimary btnText="Search" onClick={handleSearchClick} />
        </ThemeProvider>
      </div>
    );
  };
  const CarSection = () => {
    return (
      <div className={classes.filters}>
        <ShowTabs />
        <MakeDropdown />
        <ModelDropdown />
        <InputPostcode />
        <SearchButton />
      </div>
    );
  };
  const ResultHeader = () => {
    return (
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
          <ThemeProvider value={WHITE_THEME}>
            <ButtonPrimary imgSrc="/images/love.png" btnText="Save Search" />
          </ThemeProvider>
        </div>
      </div>
    );
  };
  const CarDetailsTabs = () => {
    return (
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
    );
  };
  return (
    <>
      <Navbar backgroundColor="var(--color-gray600)" />
      <Wrapper padding="63px 240px">
        <div className={classes.container}>
          <div className={classes.filterContainer}>
            <CarSection />
            <Filters />
          </div>
          <div className={classes.subContainer}>
            <div className={classes.resultContainer}>
              <ResultHeader />
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

              <LoadResults />
            </div>
            <Pagination />
          </div>
        </div>

        <CarDetailsTabs />
      </Wrapper>
      <Footer />
    </>
  );
}
