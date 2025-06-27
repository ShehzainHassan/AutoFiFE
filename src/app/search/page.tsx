"use client";

import { useSearchPage } from "./useSearchPage";
import Footer from "../components/footer/footer";
import LoadResults from "../components/load-results/load-results";
import Navbar from "../components/navbar/navbar";
import Pagination from "../components/pagination/pagination";
import ResultHeaderBottom from "../components/result-header-bottom/result-header-bottom";
import ResultHeader from "../components/result-header/result-header";
import SidebarContainer from "../components/sidebar/sidebar-container";
import VehicleInfoTabs from "../components/vehicle-info/vehicle-info";
import Wrapper from "../components/wrapper/wrapper";
import classes from "./page.module.css";

export default function Search() {
  const {
    filters,
    resultText,
    setResultText,
    submittedParams,
    setSubmittedParams,
    vehicleCount,
  } = useSearchPage();

  return (
    <>
      <Navbar backgroundColor="var(--color-gray600)" />
      <Wrapper padding="63px 240px">
        <div className={classes.container}>
          <SidebarContainer
            setSubmittedParams={setSubmittedParams}
            setResultText={setResultText}
          />
          <div className={classes.subContainer}>
            <div className={classes.resultContainer}>
              <ResultHeader resultText={resultText} />
              <ResultHeaderBottom filters={filters} />
              <LoadResults />
            </div>
            <Pagination totalCount={vehicleCount ?? 0} />
          </div>
        </div>
        <VehicleInfoTabs submittedParams={submittedParams} />
      </Wrapper>
      <Footer />
    </>
  );
}
