import Image from "next/image";
import { ButtonPrimary } from "@/app/components";
import classes from "./get-finance-quote.module.css";
import { GetFinanceQuoteProps } from "./get-finance-quote.types";
import CarImage from "@/assets/images/cars/Bentley-Arnage4.4.png";
import Policy from "../policy";
import VehicleDetails from "../vehicle-details";
const GetFinanceQuote = ({ vehicle, nextStep }: GetFinanceQuoteProps) => {
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Get your finance quote</h1>
      <Image
        src={CarImage}
        alt="car-image"
        width={850}
        height={445}
        loading="lazy"
        placeholder="blur"
      />
      <VehicleDetails vehicle={vehicle} />
      <ButtonPrimary
        btnText="Continue"
        onClick={nextStep}
        className={classes.button}
        textColor="var(--color-white100)"
        imgSrc="/images/arrow-right.png"
      />
      <Policy />
    </div>
  );
};
export default GetFinanceQuote;
