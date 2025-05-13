"use client";
import { useVehicle } from "@/contexts/vehicleContext";
import { useVehicleResult } from "@/contexts/vehicleResultsContext";
import headings from "@/styles/typography.module.css";
import { getMakeByModel, getModelOptions } from "@/utilities/utilities";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import ButtonPrimary from "../components/Buttons/Primary";
import DropdownWithLabel from "../components/dropdown-with-label";
import FAQs from "../components/faqs";
import Footer from "../components/footer";
import HorizontalTabs from "../components/horizontal-tabs";
import InputWithLabel from "../components/input-with-label";
import Navbar from "../components/navbar";
import Pagination from "../components/pagination";
import ResultCard from "../components/result-card";
import SortBy from "../components/sort-by";
import Wrapper from "../components/wrapper";
import classes from "./page.module.css";
import { MAKE_OPTIONS } from "@/constants";
import Filters from "../components/filters";

export default function Search() {
  const tabs = ["Car", "Body style", "Price"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const carInfoTabs = ["FAQs", "Reviews", "Variants", "Pricing"];
  const [selectedInfoTab, setSelectedInfoTab] = useState(carInfoTabs[0]);
  const { makeGlobal, setMakeGlobal, model, setModel, priceRange } =
    useVehicle();
  const { vehicleList, fetchVehiclesByMake, fetchVehiclesByModel, loading } =
    useVehicleResult();
  const router = useRouter();
  const handleSearchClick = () => {
    if (model !== "Any Models" && priceRange === "All Prices") {
      fetchVehiclesByModel(model, 0);
    } else if (
      makeGlobal !== "Any Makes" &&
      model === "Any Models" &&
      priceRange === "All Prices"
    ) {
      fetchVehiclesByMake(makeGlobal, 0);
    } else {
      fetchVehiclesByMake("Any Makes", 0);
    }
    router.push(
      `/search?make=${makeGlobal}&model=${model}&price=${priceRange}`
    );
  };
  const searchParams = useSearchParams();
  const urlModel = searchParams.get("model");
  useEffect(() => {
    if (urlModel) {
      const selectedMake = getMakeByModel(urlModel);
      if (selectedMake) {
        setMakeGlobal(selectedMake);
      }
      setModel(urlModel);
    }
  }, [urlModel]);
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
                value={makeGlobal}
                onChange={(value) => {
                  setMakeGlobal(value);
                  setModel("Any Models");
                }}
                placeholder="Make"
                options={MAKE_OPTIONS}
              />
              <DropdownWithLabel
                label="Model"
                key={model}
                value={model}
                onChange={setModel}
                placeholder="Model"
                options={getModelOptions(makeGlobal)}
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
                {vehicleList.map((vehicle) => (
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
              {loading && (
                <div className={`loadingSpinnerWrapper ${classes.loading}`}>
                  <ClipLoader size={50} color="var(--color-black100)" />
                </div>
              )}
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
