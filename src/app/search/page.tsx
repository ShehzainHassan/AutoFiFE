"use client";

import NeedHelp from "../components/box-assistant/need-help/need-help";
import Footer from "../components/footer/footer";
import LoadResults from "../components/load-results/load-results";
import VirtualizedList from "../components/load-virtualized-results/load-virutalized-results";
import NavbarContainer from "../components/navbar/navbar-container";
import Pagination from "../components/pagination/pagination";
import ResultHeaderBottom from "../components/result-header-bottom/result-header-bottom";
import ResultHeader from "../components/result-header/result-header";
import SidebarContainer from "../components/sidebar/sidebar-container";
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
      <NavbarContainer backgroundColor="var(--color-gray600)" />
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
          <VirtualizedList />
        </div>
        <VehicleInfoTabs submittedParams={submittedParams} />
      </div>
      <NeedHelp />
      <Footer />
    </>
  );
}
