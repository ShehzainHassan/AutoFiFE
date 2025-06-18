"use client";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { useUserFavorites } from "@/contexts/user-favorites-context/user-favorites-context";
import useAddUserSearch from "@/hooks/useAddUserSearch";
import useAllColors from "@/hooks/useAllColors";
import { useCurrentUrl } from "@/hooks/useCurrentUrl";
import useDeleteUserSearch from "@/hooks/useDeleteUserSearch";
import useGearboxCount from "@/hooks/useGearboxCount";
import useGetAllMakes from "@/hooks/useGetAllMakes";
import useVehicleColorCount from "@/hooks/useVehicleColorCount";
import useVehicleCount from "@/hooks/useVehicleCount";
import { VehicleFilter } from "@/interfaces/vehicle";
import headings from "@/styles/typography.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import {
  convertArrayToString,
  formatMakeOptions,
  getModelOptions,
  getResultTitle,
  getUserIdFromLocalStorage,
} from "@/utilities/utilities";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "../components/buttons/button-primary/button-primary";
import { Dropdown } from "../components/dropdown";
import FAQs from "../components/faqs/faqs";
import Filters from "../components/filters/filters";
import HorizontalTabs from "../components/horizontal-tabs/horizontal-tabs";
import LoadResults from "../components/load-results/load-results";
import Navbar from "../components/navbar/navbar";
import Pagination from "../components/pagination/pagination";
import SortBy from "../components/sort-by/sort-by";
import Wrapper from "../components/wrapper/wrapper";
import classes from "./page.module.css";
import Footer from "../components/footer/footer";

export default function Search() {
  // const tabs = ["Car", "Body style", "Price"];
  // const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const carInfoTabs = ["FAQs", "Reviews", "Variants", "Pricing"];
  const [selectedInfoTab, setSelectedInfoTab] = useState(carInfoTabs[0]);
  // const [postCode, setPostCode] = useState<number>(0);
  const {
    mainSearch,
    searchParams,
    stagedSearch,
    setMainSearch,
    setSearchParams,
    setExpandedSections,
    setAllColors,
    setCounts,
    setStagedSearch,
  } = useSearch();
  const router = useRouter();
  const [submittedParams, setSubmittedParams] = useState(searchParams);
  const filters: VehicleFilter = useMemo(
    () => ({
      make: mainSearch.make,
      model: mainSearch.model,
      startPrice: mainSearch.startPrice,
      endPrice: mainSearch.endPrice,
      mileage: mainSearch.mileage,
      startYear: mainSearch.startYear,
      endYear: mainSearch.endYear,
      gearbox: convertArrayToString(mainSearch.selectedGearboxes),
      selectedColors: convertArrayToString(mainSearch.selectedColors),
      status: mainSearch.status,
    }),
    [mainSearch]
  );
  const [resultText, setResultText] = useState(
    getResultTitle(mainSearch.make, mainSearch.model)
  );
  const { data: gearboxesCount } = useGearboxCount(filters);
  const { data: colorsCount } = useVehicleColorCount(filters);
  const { data: allColors } = useAllColors();
  useEffect(() => {
    if (gearboxesCount) setCounts((prev) => ({ ...prev, gearboxesCount }));
    if (colorsCount) setCounts((prev) => ({ ...prev, colorsCount }));
    if (allColors) setAllColors(allColors);
  }, [gearboxesCount, colorsCount, allColors, setCounts, setAllColors]);

  const handleSearchClick = () => {
    const newParams = {
      ...searchParams,
      make: stagedSearch.stagedMake,
      offset: 0,
      model: stagedSearch.stagedModel,
      startPrice: stagedSearch.stagedStartPrice,
      endPrice: stagedSearch.stagedEndPrice,
      status: stagedSearch.stagedStatus,
      mileage: stagedSearch.stagedMileage,
      startYear: stagedSearch.stagedStartYear,
      endYear: stagedSearch.stagedEndYear,
      gearbox: convertArrayToString(stagedSearch.stagedGearboxes),
      selectedColor: convertArrayToString(stagedSearch.stagedColors),
    };
    setMainSearch({
      ...mainSearch,
      make: stagedSearch.stagedMake,
      model: stagedSearch.stagedModel,
      startPrice: stagedSearch.stagedStartPrice,
      endPrice: stagedSearch.stagedEndPrice,
      status: stagedSearch.stagedStatus,
      mileage: stagedSearch.stagedMileage,
      startYear: stagedSearch.stagedStartYear,
      endYear: stagedSearch.stagedEndYear,
      selectedGearboxes: stagedSearch.stagedGearboxes,
      selectedColors: stagedSearch.stagedColors,
    });
    setSearchParams(newParams);
    setSubmittedParams(newParams);
    setExpandedSections(new Set());
    setResultText(
      getResultTitle(stagedSearch.stagedMake, stagedSearch.stagedModel)
    );
    let mileageText = "Any";
    if (stagedSearch.stagedMileage) {
      mileageText = `<=${stagedSearch.stagedMileage}`;
    } else if (stagedSearch.stagedMileage === 0) {
      mileageText = "0";
    }
    let gearboxText = "Any";
    if (
      stagedSearch.stagedGearboxes.length > 0 &&
      stagedSearch.stagedGearboxes.length !== 3
    ) {
      gearboxText = stagedSearch.stagedGearboxes.join(",");
    }
    let colorsText = "Any";
    if (
      stagedSearch.stagedColors.length > 0 &&
      stagedSearch.stagedColors.length !== 16
    ) {
      colorsText = stagedSearch.stagedColors.join(",");
    }

    router.push(
      `/search?make=${stagedSearch.stagedMake}&model=${stagedSearch.stagedModel}&price=${mainSearch.price}&mileage=${mileageText}&startYear=${stagedSearch.stagedStartYear}&endYear=${stagedSearch.stagedEndYear}&gearbox=${gearboxText}&colors=${colorsText}&status=${stagedSearch.stagedStatus}`
    );
  };

  // const ShowTabs = () => {
  //   return (
  //     <ThemeProvider value={GRAY_BLUE_THEME}>
  //       <HorizontalTabs
  //         tabs={tabs}
  //         selectedTab={selectedTab}
  //         onTabChange={(tab) => setSelectedTab(tab)}
  //       />
  //     </ThemeProvider>
  //   );
  // };
  const MakeDropdown = () => {
    const { data: makes, isLoading } = useGetAllMakes();
    const loadMakeOptions = useMemo(() => {
      if (isLoading) {
        return [{ label: "Any Makes", value: "Any_Makes" }];
      }
      return makes
        ? formatMakeOptions(makes)
        : [{ label: "Any Makes", value: "Any_Makes" }];
    }, [makes, isLoading]);

    return (
      <Dropdown
        value={stagedSearch.stagedMake}
        onChange={(value) => {
          setStagedSearch({
            ...stagedSearch,
            stagedMake: value,
            stagedModel: "Any_Models",
          });
        }}
        placeholder="Select make">
        <Dropdown.Label>Make</Dropdown.Label>
        <Dropdown.Select options={loadMakeOptions} />
      </Dropdown>
    );
  };
  const ModelDropdown = ({ make }: { make: string }) => {
    const modelOptions = useMemo(
      () => getModelOptions(make ?? "Any_Makes"),
      [make]
    );
    return (
      <Dropdown
        value={stagedSearch.stagedModel}
        onChange={(value) => {
          setStagedSearch({
            ...stagedSearch,
            stagedModel: value,
          });
        }}
        placeholder="Select model">
        <Dropdown.Label>Model</Dropdown.Label>
        <Dropdown.Select options={modelOptions} />
      </Dropdown>
    );
  };
  // const InputPostcode = () => {
  //   return (
  //     <Input
  //       value={postCode}
  //       onChange={(e) => setPostCode(Number(e.target.value))}>
  //       <Input.Label>Postcode</Input.Label>
  //       <Input.Field />
  //     </Input>
  //   );
  // };
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
        {/* <ShowTabs /> */}
        <MakeDropdown />
        <ModelDropdown make={stagedSearch.stagedMake} />
        {/* <InputPostcode /> */}
        <SearchButton />
      </div>
    );
  };
  const SaveSearchButton = () => {
    const { userSearches } = useUserFavorites();
    const saveSearchMutation = useAddUserSearch();
    const deleteSearchMutation = useDeleteUserSearch();
    const userId = getUserIdFromLocalStorage();
    const currentUrl = useCurrentUrl();
    const search = currentUrl?.search.toString() ?? "";
    const isSaved = useMemo(() => {
      if (!userSearches || !search) return false;
      return userSearches.includes(search);
    }, [userSearches, search]);

    const handleSaveSearch = async () => {
      if (!userId) {
        toast.error("Please sign in to save search");
        return;
      }
      if (!isSaved) {
        saveSearchMutation.mutate({ userId, search });
      } else {
        deleteSearchMutation.mutate({ userId, search });
      }
    };
    return (
      <div className={classes.saveBtnContainer} onClick={handleSaveSearch}>
        {isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        <button className={classes.saveBtn}>Save Search</button>
      </div>
    );
  };
  const ResultHeader = () => {
    const { loadingSearches } = useUserFavorites();

    return (
      <div className={classes.resultHeader}>
        <h1 className={headings.resultTitle}>{resultText}</h1>

        <div className={classes.resultHeaderText}>
          <p className={classes.text}>
            See our <span className={classes.bold}>3,517</span> reviews on{" "}
            <span className={classes.star} />
            Trustpilot
          </p>
          {loadingSearches ? <p>Loading...</p> : <SaveSearchButton />}
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
        <FAQs searchParams={submittedParams} />
      </Wrapper>
    );
  };
  const { data: vehicleCount, isLoading } = useVehicleCount(filters);
  const NoOfLoadResultText = () => {
    if (isLoading) return <p>Loading...</p>;
    return (
      <div className={classes.results}>
        <p className={classes.noOfResults}>
          {vehicleCount?.toLocaleString()} results
        </p>
        <Image
          src="/images/location.png"
          alt="location"
          width={12}
          height={12}
          className={classes.location}
        />
      </div>
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
                <NoOfLoadResultText />
                <SortBy />
              </div>

              <LoadResults />
            </div>
            <Pagination totalCount={vehicleCount ?? 0} />
          </div>
        </div>
        <CarDetailsTabs />
      </Wrapper>
      <Footer />
    </>
  );
}
