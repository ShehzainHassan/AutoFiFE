import { MAKE_OPTIONS, PRICE_OPTIONS } from "@/constants";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import { useSearch } from "@/contexts/carSearchContext";
import { customSelectStyles } from "@/styles/custom-select";
import { ThemeProvider } from "@/theme/themeContext";
import {
  getModelOptions,
  getPriceRange,
  parseStatus,
} from "@/utilities/utilities";
import { useRouter } from "next/navigation";
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
    return (
      <div className={classes.criteriaContainer}>
        <Dropdown
          value={make ?? "Any_Makes"}
          onChange={(value) => {
            setMake(value);
            setModel("Any_Models");
          }}
          placeholder="Select make">
          <Dropdown.Select
            options={MAKE_OPTIONS}
            styles={customSelectStyles}
            components={{ DropdownIndicator: CustomDropdownIndicator }}
          />
        </Dropdown>

        <div className={classes.verticalBorder} />
      </div>
    );
  };
  const ModelDropdown = () => {
    return (
      <div className={classes.criteriaContainer}>
        <Dropdown
          key={model}
          value={model ?? "Any_Models"}
          onChange={setModel}
          placeholder="Select model">
          <Dropdown.Select
            options={getModelOptions(make ?? "Any_Makes")}
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
      <ModelDropdown />
      <PriceDropdown />
      <SearchButton />
    </div>
  );
}
