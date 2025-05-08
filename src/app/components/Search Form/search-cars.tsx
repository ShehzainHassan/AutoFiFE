import { useVehicle } from "@/contexts/vehicleContext";
import { makeOptions, modelOptions, priceOptions } from "../../../../constants";
import ButtonPrimary from "../Buttons/Primary/primary";
import DropdownWithoutLabel from "../Dropdown without Label/dropdown";
import classes from "./search-cars.module.css";
import { useRouter } from "next/navigation";

export default function SearchCars() {
  const { make, model, price, setMake, setModel, setPrice } = useVehicle();
  const router = useRouter();
  const handleSearchClick = () => {
    router.push(`/search?make=${make}&model=${model}&price=${price}`);
  };
  return (
    <div className={classes.container}>
      <div className={classes.criteriaContainer}>
        <DropdownWithoutLabel
          value={make}
          options={makeOptions}
          onChange={setMake}
          placeholder="Select make"
        />
        <div className={classes.verticalBorder} />
      </div>
      <div className={classes.criteriaContainer}>
        <DropdownWithoutLabel
          value={model}
          options={modelOptions}
          onChange={setModel}
          placeholder="Select model"
        />
        <div className={classes.verticalBorder} />
      </div>
      <div className={classes.priceBtnContainer}>
        <DropdownWithoutLabel
          value={price}
          onChange={setPrice}
          options={priceOptions}
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
