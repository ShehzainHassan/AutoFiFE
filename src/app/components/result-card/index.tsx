import Image from "next/image";
import classes from "./result-card.module.css";
import headings from "@/styles/typography.module.css";
import ButtonPrimary from "../Buttons/Primary";
import { CURRENCY } from "../../../../constants";

type ResultCardProps = {
  specialText?: string;
  carImg: string;
  miles: number;
  price: number;
  carTitle: string;
};
export default function ResultCard({
  specialText,
  carImg,
  miles,
  price,
  carTitle,
}: ResultCardProps) {
  return (
    <div className={classes.container}>
      <div className={classes.carImg}>
        <Image
          src={carImg}
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

      <div className={classes.carDetails}>
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
        <div className={classes.cardMiddle}>
          <div className={classes.partner}>
            <Image
              src="/images/partner.png"
              alt="partner"
              width={16}
              height={16}
            />
            <p className={headings.carTitle}>CarGurus partner</p>
          </div>
          <div className={`${classes.perMonth} ${headings.smallText}`}>
            <p>Est. $388/mo</p>
            <div className={classes.circle}>i</div>
          </div>
        </div>
        <div className={classes.rating}>
          <p className={headings.noRatings}>No rating</p>
        </div>
        <div className={`${classes.features} ${headings.smallText}`}>
          <p>Leather seats</p>
          <p>.</p>
          <p>Alloy wheels</p>
        </div>
        <div className={classes.contact}>
          <p className={`${headings.contact} ${classes.blue}`}>01622 237423</p>
          <ButtonPrimary
            btnText="Request info"
            textColor="var(--color-black100)"
            border="1px solid var(--color-black100)"
          />
        </div>
        <div className={classes.cardBottom}>
          <p>Tonbridge</p>
          <Image src="/images/more.png" alt="more" width={4} height={14} />
        </div>
      </div>
    </div>
  );
}
