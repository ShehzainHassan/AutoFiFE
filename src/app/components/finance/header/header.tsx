import Image from "next/image";
import classes from "./header.module.css";
import { CURRENCY } from "@/constants";
import { HeaderProps } from "./header.types";
const Header = ({ prevStep, vehicle }: HeaderProps) => {
  return (
    <div className={classes.headerContainer}>
      <div onClick={prevStep} className={classes.previousContainer}>
        <Image
          src="/images/next.png"
          alt="prev"
          width={10}
          height={10}
          className={classes.prev}
        />
        <p className={classes.previousText}>Previous Step</p>
      </div>
      <div className={classes.vehicleTitle}>
        <h1 className={classes.vehicleName}>
          {vehicle.year} {vehicle.make.toUpperCase()}
          {vehicle.model.toUpperCase()}
        </h1>
        <p className={classes.vehiclePrice}>
          {CURRENCY} {vehicle.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
export default Header;
