"use client";
import { PRICE_OPTIONS } from "@/constants";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import useGetAllMakes from "@/hooks/useGetAllMakes";
import { customSelectStyles } from "@/styles/custom-select";
import { ThemeProvider } from "@/theme/themeContext";
import {
  formatMakeOptions,
  getModelOptions,
  getPriceRange,
  parseStatus,
} from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import classes from "./search-form.module.css";
import { SearchFormProps } from "./search-form.types";
import { Dropdown } from "../dropdown";
import CustomDropdownIndicator from "../dropdown-indicator/dropdown-indicator";
import ButtonPrimary from "../buttons/button-primary/button-primary";

export default function SearchForm({ statusTab }: SearchFormProps) {
  const {
    mainSearch,
    stagedSearch,
    setStagedSearch,
    setMainSearch,
    searchParams,
    setSearchParams,
  } = useSearch();

  const router = useRouter();

  const handleSearchClick = () => {
    const { startPrice, endPrice } = getPriceRange(mainSearch.price);
    const status = parseStatus(statusTab);
    const updatedSearch = {
      ...mainSearch,
      startPrice: startPrice,
      endPrice: endPrice,
      status,
    };

    setMainSearch(updatedSearch);
    setStagedSearch({
      ...stagedSearch,
      stagedMake: mainSearch.make,
      stagedModel: mainSearch.model,
      stagedStartPrice: mainSearch.startPrice,
      stagedEndPrice: mainSearch.endPrice,
    });
    setSearchParams({
      ...searchParams,
      make: updatedSearch.make,
      model: updatedSearch.model,
      status: updatedSearch.status,
      startPrice: startPrice,
      endPrice: endPrice,
    });
    router.push(
      `/search?make=${updatedSearch.make}&model=${updatedSearch.model}&price=${updatedSearch.price}&status=${updatedSearch.status}`
    );
  };

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
      <div className={classes.criteriaContainer}>
        <Dropdown
          value={mainSearch.make}
          onChange={(value) =>
            setMainSearch((prev) => ({
              ...prev,
              make: value,
              model: "Any_Models",
            }))
          }
          placeholder="Select make">
          <Dropdown.Select
            options={loadMakeOptions}
            styles={customSelectStyles}
            components={{ DropdownIndicator: CustomDropdownIndicator }}
          />
        </Dropdown>
        <div className={classes.verticalBorder} />
      </div>
    );
  };

  const ModelDropdown = ({ make }: { make: string }) => {
    const modelOptions = useMemo(
      () => getModelOptions(make ?? "Any_Makes"),
      [make]
    );

    return (
      <div className={classes.criteriaContainer}>
        <Dropdown
          value={mainSearch.model}
          onChange={(value) =>
            setMainSearch((prev) => ({ ...prev, model: value }))
          }
          placeholder="Select model">
          <Dropdown.Select
            options={modelOptions}
            styles={customSelectStyles}
            components={{ DropdownIndicator: CustomDropdownIndicator }}
          />
        </Dropdown>
        <div className={classes.verticalBorder} />
      </div>
    );
  };

  const PriceDropdown = () => {
    return (
      <div className={classes.priceBtnContainer}>
        <Dropdown
          value={mainSearch.price}
          onChange={(value) =>
            setMainSearch((prev) => ({ ...prev, price: value }))
          }
          placeholder="Select price">
          <Dropdown.Select
            options={PRICE_OPTIONS}
            styles={customSelectStyles}
            components={{ DropdownIndicator: CustomDropdownIndicator }}
          />
        </Dropdown>
      </div>
    );
  };

  const SearchButton = () => {
    return (
      <ThemeProvider value={BLUE_THEME}>
        <ButtonPrimary
          imgSrc="/images/search.png"
          btnText="Search Cars"
          padding="15px 40px"
          onClick={handleSearchClick}
        />
      </ThemeProvider>
    );
  };

  return (
    <div className={classes.container}>
      <MakeDropdown />
      <ModelDropdown make={mainSearch.make} />
      <PriceDropdown />
      <SearchButton />
    </div>
  );
}
