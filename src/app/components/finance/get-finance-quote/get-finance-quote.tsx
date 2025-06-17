import Image from "next/image";
import ButtonPrimary from "../../buttons/button-primary/button-primary";
import classes from "./get-finance-quote.module.css";
import { GetFinanceQuoteProps } from "./get-finance-quote.types";
import Policy from "../policy/policy";
import VehicleDetails from "../vehicle-details/vehicle-details";
const GetFinanceQuote = ({ vehicle, nextStep }: GetFinanceQuoteProps) => {
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Get your finance quote</h1>
      <Image
        src="/images/Bentley-Arnage4.4.png"
        alt="car-image"
        width={850}
        height={445}
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
