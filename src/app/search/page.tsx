"use client";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import { useSearch } from "@/contexts/carSearchContext";
import useGetAllMakes from "@/hooks/useGetAllMakes";
import useSearchVehicles from "@/hooks/useSearchVehicles";
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

import { useUserFavorites } from "@/contexts/userFavoritesContext";
import useAddUserSearch from "@/hooks/useAddUserSearch";
import { useCurrentUrl } from "@/hooks/useCurrentUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "../components/buttons/Primary";
import Dropdown from "../components/dropdown";
import EmptyState from "../components/empty-state";
import FAQs from "../components/faqs";
import Filters from "../components/filters";
import Footer from "../components/footer";
import HorizontalTabs from "../components/horizontal-tabs";
import LoadResults from "../components/load-results";
import Navbar from "../components/navbar";
import Pagination from "../components/pagination";
import SortBy from "../components/sort-by";
import Wrapper from "../components/wrapper";
import classes from "./page.module.css";
import useDeleteUserSearch from "@/hooks/useDeleteUserSearch";

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
    selectedColors,
    searchParams,
    setMake,
    setModel,
    setSearchParams,
    setExpandedSections,
  } = useSearch();
  const router = useRouter();
  const [resultText, setResultText] = useState(getResultTitle(make, model));
  const [submittedParams, setSubmittedParams] = useState(searchParams);
  const [submittedMake, setSubmittedMake] = useState(make);
  const [submittedModel, setSubmittedModel] = useState(model);
  const handleSearchClick = () => {
    const newParams = {
      ...searchParams,
      make,
      offset: 0,
      model,
      startPrice,
      endPrice,
      status,
      mileage,
      startYear,
      endYear,
      gearbox: convertArrayToString(selectedGearboxes),
      selectedColor: convertArrayToString(selectedColors),
    };
    setSubmittedMake(make);
    setSubmittedModel(model);
    setSearchParams(newParams);
    setSubmittedParams(newParams);
    setExpandedSections(new Set());
    setResultText(getResultTitle(make, model));
    let mileageText = "Any";
    if (mileage) {
      mileageText = `<=${mileage}`;
    }
    let gearboxText = "Any";
    if (selectedGearboxes.length > 0 && selectedGearboxes.length !== 3) {
      gearboxText = selectedGearboxes.join(",");
    }
    let colorsText = "Any";
    if (selectedColors.length > 0 && selectedColors.length !== 16) {
      colorsText = selectedColors.join(",");
    }
    router.push(
      `/search?make=${make}&model=${model}&price=${price}&mileage=${mileageText}&startYear=${startYear}&endYear=${endYear}&gearbox=${gearboxText}&colors=${colorsText}&status=${status}`
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
        value={make}
        onChange={(value) => {
          setMake(value);
          setModel("Any_Models");
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
      <Dropdown value={model} onChange={setModel} placeholder="Select model">
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
        <ModelDropdown make={make} />
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
        <FAQs
          make={submittedMake}
          model={submittedModel}
          searchParams={submittedParams}
        />
      </Wrapper>
    );
  };
  const NoOfLoadResultText = () => {
    const { data, isLoading } = useSearchVehicles(searchParams);
    if (isLoading) return <p>Loading...</p>;
    if (!data) return <EmptyState message="0 results" />;
    return (
      <div className={classes.results}>
        <p className={classes.noOfResults}>
          {data?.totalCount.toLocaleString()} results
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
            <Pagination />
          </div>
        </div>
        <CarDetailsTabs />
      </Wrapper>
      <Footer />
    </>
  );
}
