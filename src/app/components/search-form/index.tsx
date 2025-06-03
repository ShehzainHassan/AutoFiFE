import { PRICE_OPTIONS } from "@/constants";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import { useSearch } from "@/contexts/carSearchContext";
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
import ButtonPrimary from "../buttons/Primary";
import Dropdown from "../dropdown";
import CustomDropdownIndicator from "../dropdown-indicator";
import classes from "./search-form.module.css";
type SearchFormProps = {
  statusTab: string;
};
export default function SearchForm({ statusTab }: SearchFormProps) {
  const {
    make,
    model,
    price,
    searchParams,
    setMake,
    setModel,
    setPrice,
    setStartPrice,
    setEndPrice,
    setSearchParams,
    setStatus,
  } = useSearch();
  const router = useRouter();

  const handleSearchClick = () => {
    const { startPrice, endPrice } = getPriceRange(price);
    const status = parseStatus(statusTab);
    setStartPrice(startPrice);
    setEndPrice(endPrice);
    setSearchParams({
      ...searchParams,
      make,
      model,
      startPrice,
      status,
      endPrice,
    });
    setStatus(status);
    router.push(
      `/search?make=${make}&model=${model}&price=${price}&status=${status}`
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
          value={make}
          onChange={(value) => {
            setMake(value);
            setModel("Any_Models");
          }}
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
          key={model}
          value={model ?? "Any_Models"}
          onChange={setModel}
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
        <Dropdown value={price} onChange={setPrice} placeholder="Select price">
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
      <ModelDropdown make={make} />
      <PriceDropdown />
      <SearchButton />
    </div>
  );
}
