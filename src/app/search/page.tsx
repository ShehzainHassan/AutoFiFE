"use client";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { useUserFavorites } from "@/contexts/user-favorites-context/user-favorites-context";
import useAddUserSearch from "@/hooks/useAddUserSearch";
import { useCurrentUrl } from "@/hooks/useCurrentUrl";
import useDeleteUserSearch from "@/hooks/useDeleteUserSearch";
import useGetAllMakes from "@/hooks/useGetAllMakes";
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
import Footer from "../components/footer/footer";
import HorizontalTabs from "../components/horizontal-tabs/horizontal-tabs";
import LoadResults from "../components/load-results/load-results";
import Navbar from "../components/navbar/navbar";
import Pagination from "../components/pagination/pagination";
import SortBy from "../components/sort-by/sort-by";
import Wrapper from "../components/wrapper/wrapper";
import classes from "./page.module.css";
import useGearboxCount from "@/hooks/useGearboxCount";
import useVehicleColorCount from "@/hooks/useVehicleColorCount";
import useAllColors from "@/hooks/useAllColors";

export default function Search() {
  // const tabs = ["Car", "Body style", "Price"];
  // const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const carInfoTabs = ["FAQs", "Reviews", "Variants", "Pricing"];
  const [selectedInfoTab, setSelectedInfoTab] = useState(carInfoTabs[0]);
  // const [postCode, setPostCode] = useState<number>(0);
  const {
    make,
    model,
    price,
    startPrice,
    endPrice,
    mileage,
    startYear,
    endYear,
    status,
    selectedGearboxes,
    stagedGearboxes,
    selectedColors,
    searchParams,
    stagedStatus,
    stagedStartYear,
    stagedEndYear,
    stagedMileage,
    stagedStartPrice,
    stagedEndPrice,
    stagedColors,
    setMake,
    setModel,
    setSearchParams,
    setExpandedSections,
    setSelectedGearboxes,
    setStatus,
    setStartYear,
    setEndYear,
    setMileage,
    setStartPrice,
    setEndPrice,
    setSelectedColors,
    setGearboxesCount,
    setColorsCount,
    setAllColors,
  } = useSearch();
  const router = useRouter();
  const [resultText, setResultText] = useState(getResultTitle(make, model));
  const [submittedParams, setSubmittedParams] = useState(searchParams);
  const [submittedMake, setSubmittedMake] = useState(make);
  const [submittedModel, setSubmittedModel] = useState(model);

  const filters: VehicleFilter = useMemo(
    () => ({
      make,
      model,
      startPrice,
      endPrice,
      mileage,
      startYear,
      endYear,
      gearbox: convertArrayToString(selectedGearboxes),
      selectedColors: convertArrayToString(selectedColors),
      status,
    }),
    [
      make,
      model,
      startPrice,
      endPrice,
      mileage,
      startYear,
      endYear,
      selectedGearboxes,
      selectedColors,
      status,
    ]
  );
  const { data: gearboxesCount } = useGearboxCount(filters);
  const { data: colorsCount } = useVehicleColorCount(filters);
  const { data: allColors } = useAllColors();
  useEffect(() => {
    if (gearboxesCount) setGearboxesCount(gearboxesCount);
    if (colorsCount) setColorsCount(colorsCount);
    if (allColors) setAllColors(allColors);
  }, [
    gearboxesCount,
    colorsCount,
    allColors,
    setGearboxesCount,
    setColorsCount,
    setAllColors,
  ]);

  const handleSearchClick = () => {
    const newParams = {
      ...searchParams,
      make: submittedMake,
      offset: 0,
      model: submittedModel,
      startPrice: stagedStartPrice,
      endPrice: stagedEndPrice,
      status: stagedStatus,
      mileage: stagedMileage,
      startYear: stagedStartYear,
      endYear: stagedEndYear,
      gearbox: convertArrayToString(stagedGearboxes),
      selectedColor: convertArrayToString(stagedColors),
    };
    setSelectedGearboxes(stagedGearboxes);
    setMake(submittedMake);
    setModel(submittedModel);
    setSearchParams(newParams);
    setSubmittedParams(newParams);
    setExpandedSections(new Set());
    setStatus(stagedStatus);
    setStartYear(stagedStartYear);
    setEndYear(stagedEndYear);
    setResultText(getResultTitle(make, model));
    setMileage(stagedMileage);
    setStartPrice(stagedStartPrice);
    setEndPrice(stagedEndPrice);
    setSelectedColors(stagedColors);
    let mileageText = "Any";
    if (stagedMileage) {
      mileageText = `<=${stagedMileage}`;
    } else if (stagedMileage === 0) {
      mileageText = "0";
    }
    let gearboxText = "Any";
    if (stagedGearboxes.length > 0 && stagedGearboxes.length !== 3) {
      gearboxText = stagedGearboxes.join(",");
    }
    let colorsText = "Any";
    if (stagedColors.length > 0 && stagedColors.length !== 16) {
      colorsText = stagedColors.join(",");
    }
    router.push(
      `/search?make=${submittedMake}&model=${submittedModel}&price=${price}&mileage=${mileageText}&startYear=${stagedStartYear}&endYear=${stagedEndYear}&gearbox=${gearboxText}&colors=${colorsText}&status=${stagedStatus}`
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
        value={submittedMake}
        onChange={(value) => {
          setSubmittedMake(value);
          setSubmittedModel("Any_Models");
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
        value={submittedModel}
        onChange={setSubmittedModel}
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
        <ModelDropdown make={submittedMake} />
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
        <FAQs make={make} model={model} searchParams={submittedParams} />
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
