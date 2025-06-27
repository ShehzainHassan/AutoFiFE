import Image from "next/image";
import { useRouter } from "next/navigation";
import carFinanceLogo from "@/assets/images/logos/CarFinance.png";
import classes from "../vehicle-features.module.css";
import ButtonPrimary from "../../buttons/button-primary/button-primary";
import { CarFinanceProps } from "../vehicle-features.types";
const CarFinance = ({ vehicle }: CarFinanceProps) => {
  const router = useRouter();
  const handleQuote = () => {
    router.push(`/finance/${vehicle?.id}`);
  };
  return (
    <div className={classes.financeContainer}>
      <div className={classes.financeBenefits}>
        <p className={classes.financeText}>Get car finance online</p>
        <ul className={classes.list}>
          <li>No-obligation quote</li>
          <li>Trusted by 1000s</li>
        </ul>
      </div>
      <div className={classes.btnContainer}>
        <Image
          src={carFinanceLogo}
          alt="car-finance-logo"
          width={130}
          height={18}
          loading="lazy"
          placeholder="blur"
        />
        <ButtonPrimary
          imgSrc="/images/get-quote.png"
          btnText="Get my quote"
          onClick={handleQuote}
          className={classes.button}
        />
      </div>
      <p className={classes.financeBottomText}>
        Representative APR 19.9%. Car Finance 247 Limited is a credit broker,
        not a lender
      </p>
    </div>
  );
};

export default CarFinance;
