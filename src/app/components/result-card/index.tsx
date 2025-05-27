import Image from "next/image";
import { FC } from "react";
import classes from "./result-card.module.css";
import headings from "@/styles/typography.module.css";
import { CURRENCY } from "@/constants";
import ButtonPrimary from "../buttons/Primary";
import { ThemeProvider } from "@/theme/themeContext";
import { WHITE_THEME } from "@/constants/button-primary-themes";
import { useRouter } from "next/navigation";

type ResultCardProps = {
  id: number;
  specialText?: string;
  carImg: string;
  miles: number;
  price: number;
  carTitle: string;
};

export default function ResultCard({
  id,
  specialText,
  carImg,
  miles,
  price,
  carTitle,
}: ResultCardProps) {
  const router = useRouter();
  const redirectToCarsPage = () => {
    router.push(`/cars/${id}`);
  };
  return (
    <div className={classes.container} onClick={redirectToCarsPage}>
      <CarImage src={carImg} />
      <CarDetails
        id={id}
        specialText={specialText}
        carTitle={carTitle}
        miles={miles}
        price={price}
      />
    </div>
  );
}

const CarImage: FC<{ src: string }> = ({ src }) => (
  <div className={classes.carImg}>
    <Image
      src={src}
      alt="car-img"
      width={360}
      height={200}
      className={classes.car}
    />
    <div className={classes.imgContainer}>
      <Image
        src="/images/love.png"
        alt="heart-icon"
        width={25}
        height={21.33}
      />
    </div>
  </div>
);

const CarDetails: FC<Omit<ResultCardProps, "carImg">> = ({
  specialText,
  carTitle,
  miles,
  price,
}) => (
  <div className={classes.carDetails}>
    <CardHeader {...{ specialText, carTitle, miles, price }} />

    <div className={classes.cardMiddle}>
      <PartnerInfo />
      <EstimatedMonthly />
    </div>

    <Rating />
    <Features />
    <Contact />
    <CardBottom />
  </div>
);

const CardHeader: FC<
  Pick<ResultCardProps, "specialText" | "carTitle" | "miles" | "price">
> = ({ specialText, carTitle, miles, price }) => (
  <>
    <div className={classes.cardTop}>
      {specialText && <p className={headings.smallText}>{specialText}</p>}
      <h1 className={headings.carTitle}>{carTitle}</h1>
    </div>
    <div className={classes.distancePrice}>
      <p className={headings.mileage}>{miles.toLocaleString()} mi</p>
      <p className={headings.resultCardPrice}>
        {CURRENCY}
        {price.toLocaleString()}
      </p>
    </div>
  </>
);

const PartnerInfo = () => (
  <div className={classes.partner}>
    <Image src="/images/partner.png" alt="partner" width={16} height={16} />
    <p className={headings.carTitle}>CarGurus partner</p>
  </div>
);

const EstimatedMonthly = () => (
  <div className={`${classes.perMonth} ${headings.smallText}`}>
    <p>Est. $388/mo</p>
    <div className={classes.circle}>i</div>
  </div>
);

const Rating = () => (
  <div className={classes.rating}>
    <p className={headings.noRatings}>No rating</p>
  </div>
);

const Features = () => (
  <div className={`${classes.features} ${headings.smallText}`}>
    <p>Leather seats</p>
    <p>.</p>
    <p>Alloy wheels</p>
  </div>
);

const Contact = () => (
  <div className={classes.contact}>
    <p className={`${headings.contact} ${classes.blue}`}>01622 237423</p>
    <ThemeProvider value={WHITE_THEME}>
      <ButtonPrimary btnText="Request info" />
    </ThemeProvider>
  </div>
);

const CardBottom = () => (
  <div className={classes.cardBottom}>
    <p>Tonbridge</p>
    <Image src="/images/more.png" alt="more" width={4} height={14} />
  </div>
);
