"use client";

import NeedHelp from "../components/box-assistant/need-help/need-help";
import Footer from "../components/footer/footer";
import LoadResults from "../components/load-results/load-results";
import Navbar from "../components/navbar/navbar";
import Pagination from "../components/pagination/pagination";
import ResultHeaderBottom from "../components/result-header-bottom/result-header-bottom";
import ResultHeader from "../components/result-header/result-header";
import SidebarContainer from "../components/sidebar/sidebar";
import VehicleInfoTabs from "../components/vehicle-info/vehicle-info";
import classes from "./page.module.css";
import { useSearchPage } from "./useSearchPage";

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
      <div className={classes.mainContainer}>
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
      </div>
      <NeedHelp />
      <Footer />
    </>
  );
}
