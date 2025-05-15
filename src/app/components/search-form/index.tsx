import { MAKE_OPTIONS, PRICE_OPTIONS } from "@/constants";
import { getModelOptions } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import ButtonPrimary from "../Buttons/Primary";
import DropdownWithoutLabel from "../dropdown-without-label";
import classes from "./search-form.module.css";
import { useSearch } from "@/contexts/carSearchContext";

export default function SearchForm() {
  const { make, model, price, setMake, setModel, setPrice } = useSearch();
  const router = useRouter();
  const handleSearchClick = () => {
    router.push(`/search?make=${make}&model=${model}&price=${price}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.criteriaContainer}>
        <DropdownWithoutLabel
          value={make}
          options={MAKE_OPTIONS}
          onChange={(value) => {
            setMake(value);
            setModel("Any_Models");
          }}
          placeholder="Select make"
        />

        <div className={classes.verticalBorder} />
      </div>
      <div className={classes.criteriaContainer}>
        <DropdownWithoutLabel
          key={model}
          value={model ?? "Any_Models"}
          options={getModelOptions(make)}
          onChange={setModel}
          placeholder="Select model"
        />
        <div className={classes.verticalBorder} />
      </div>
      <div className={classes.priceBtnContainer}>
        <DropdownWithoutLabel
          value={price}
          onChange={setPrice}
          options={PRICE_OPTIONS}
          placeholder="Select price"
        />
        <ButtonPrimary
          imgSrc="/images/search.png"
          backgroundColor="var(--color-blue500)"
          btnText="Search Cars"
          textColor="var(--color-white100)"
          borderRadius="60px"
          padding="15px 40px"
          hoverColor="var(--color-blue600)"
          onClick={handleSearchClick}
        />
      </div>
    </div>
  );
}
