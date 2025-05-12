import { useVehicle } from "@/contexts/vehicleContext";
import { makeOptions, modelOptions, priceOptions } from "../../../../constants";
import ButtonPrimary from "../Buttons/Primary/primary";
import DropdownWithoutLabel from "../Dropdown without Label/dropdown";
import classes from "./search-cars.module.css";
import { useRouter } from "next/navigation";
import { useVehicleResult } from "@/contexts/vehicleResultsContext";

export default function SearchCars() {
  const {
    makeGlobal,
    model,
    priceRange,
    setMakeGlobal,
    setModel,
    setPriceRange,
  } = useVehicle();
  const { fetchVehicles } = useVehicleResult();
  const router = useRouter();
  const handleSearchClick = () => {
    fetchVehicles();
    router.push(
      `/search?make=${makeGlobal}&model=${model}&price=${priceRange}`
    );
  };
  return (
    <div className={classes.container}>
      <div className={classes.criteriaContainer}>
        <DropdownWithoutLabel
          value={makeGlobal}
          options={makeOptions}
          onChange={setMakeGlobal}
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
          value={priceRange}
          onChange={setPriceRange}
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
