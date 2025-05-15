"use client";
import { GRAY_BLUE_THEME, MAKE_OPTIONS, PAGE_SIZE } from "@/constants";
import { useSearch } from "@/contexts/carSearchContext";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import headings from "@/styles/typography.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { getModelOptions } from "@/utilities/utilities";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonPrimary from "../components/Buttons/Primary";
import DropdownWithLabel from "../components/dropdown-with-label";
import EmptyState from "../components/empty-state";
import ErrorMessage from "../components/error-message";
import FAQs from "../components/faqs";
import Filters from "../components/filters";
import Footer from "../components/footer";
import HorizontalTabs from "../components/horizontal-tabs";
import InputWithLabel from "../components/input-with-label";
import LoadingSpinner from "../components/loading-spinner";
import Navbar from "../components/navbar";
import Pagination from "../components/pagination";
import ResultCard from "../components/result-card";
import SortBy from "../components/sort-by";
import Wrapper from "../components/wrapper";
import classes from "./page.module.css";

export default function Search() {
  const tabs = ["Car", "Body style", "Price"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const carInfoTabs = ["FAQs", "Reviews", "Variants", "Pricing"];
  const [selectedInfoTab, setSelectedInfoTab] = useState(carInfoTabs[0]);

  const { make, model, price, startPrice, endPrice, setMake, setModel } =
    useSearch();
  const router = useRouter();
  const handleSearchClick = () => {
    setSearchParams({
      ...searchParams,
      make: make,
      model: model,
      startPrice: startPrice,
      endPrice: endPrice,
    });
    router.push(`/search?make=${make}&model=${model}&price=${price}`);
  };
  const [searchParams, setSearchParams] = useState({
    pageSize: PAGE_SIZE,
    offset: 0,
    make: make,
    model: model,
    startPrice: startPrice,
    endPrice: endPrice,
  });
  const {
    data: vehicleList,
    isLoading,
    error,
    isError,
  } = useSearchVehicles(searchParams);

  if (isLoading) return <LoadingSpinner color="var(--color-black100)" />;
  if (!vehicleList || vehicleList.totalCount === 0)
    return <EmptyState message="No vehicles found" />;
  if (isError) return <ErrorMessage message={error.message} />;
  return (
    <>
      <Navbar backgroundColor="var(--color-gray600)" />
      <Wrapper padding="63px 240px">
        <div className={classes.container}>
          <div className={classes.filterContainer}>
            <div className={classes.filters}>
              <ThemeProvider value={GRAY_BLUE_THEME}>
                <HorizontalTabs
                  tabs={tabs}
                  selectedTab={selectedTab}
                  onTabChange={(tab) => setSelectedTab(tab)}
                />
              </ThemeProvider>
              <DropdownWithLabel
                label="Make"
                value={make}
                onChange={(value) => {
                  setMake(value);
                  setModel("Any_Models");
                }}
                placeholder="Make"
                options={MAKE_OPTIONS}
              />
              <DropdownWithLabel
                label="Model"
                key={model}
                options={getModelOptions(make)}
                value={model}
                onChange={setModel}
                placeholder="Model"
              />
              <InputWithLabel label="Postcode" />

              <div className={classes.btn}>
                <ButtonPrimary
                  btnText="Search"
                  backgroundColor="var(--color-blue400)"
                  textColor="var(--color-white100)"
                  padding="12.5px 98px"
                  hoverColor="var(--color-blue600)"
                  onClick={handleSearchClick}
                />
              </div>
            </div>
            <Filters />
          </div>
          <div className={classes.subContainer}>
            <div className={classes.resultContainer}>
              <div className={classes.resultHeader}>
                <h1 className={headings.resultTitle}>
                  Used Bentley Arnage for sale nationwide
                </h1>
                <div className={classes.resultHeaderText}>
                  <p className={classes.text}>
                    See our <span className={classes.bold}>3,517</span> reviews
                    on <span className={classes.star} />
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
                {vehicleList?.vehicles.map((vehicle) => (
                  <div key={vehicle.id}>
                    <ResultCard
                      carImg="/images/Bentley-Arnage4.4.png"
                      miles={vehicle.mileage}
                      price={vehicle.price}
                      carTitle={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Pagination />
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
