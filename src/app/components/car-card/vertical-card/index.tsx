import Image from "next/image";
import classes from "./vertical-card.module.css";
import headings from "@/styles/typography.module.css";
import { CURRENCY } from "@/constants";

type CarCardProps = {
  imgSrc: string;
  carDetails: string;
  carDescription: string;
  miles: string;
  fuelType: string;
  gearType: string;
  price: number;
  tag?: string;
  tagColor?: string;
  showPreviousPrice?: boolean;
};
export default function VerticalCard({
  imgSrc,
  carDetails,
  carDescription,
  miles,
  fuelType,
  gearType,
  price,
  tag,
  tagColor,
  showPreviousPrice = false,
}: CarCardProps) {
  return (
    <div className={classes.container}>
      {tag && (
        <div className={classes.tag} style={{ backgroundColor: tagColor }}>
          {tag}
        </div>
      )}
      <div className={classes.bookmark}>
        <Image
          src="/images/bookmark.png"
          alt="bookmark"
          width={14}
          height={14}
        />
      </div>
      <div className={classes.imgWrapper}>
        <Image src={imgSrc} alt="car-name" className={classes.carImg} fill />
      </div>

      <div className={classes.carDetails}>
        <div className={`${classes.carInfo} ${classes.truncate}`}>
          <h2 className={headings.brandText}>{carDetails}</h2>
          <p className={`${headings.carDescription}`}>{carDescription}</p>
        </div>
        <div className={classes.mileage}>
          <div className={classes.border} />
          <div className={classes.mileageDetails}>
            <div className={classes.imgContainer}>
              <Image
                src={"/images/speedometer.png"}
                alt="speedometer"
                width={18}
                height={18}
              />
              <p className={headings.carDescription}>{miles}</p>
            </div>
            <div className={classes.imgContainer}>
              <Image
                src={"/images/diesel.svg"}
                alt="diesel"
                width={18}
                height={18}
              />
              <p className={headings.carDescription}>{fuelType}</p>
            </div>
            <div className={classes.imgContainer}>
              <Image
                src={"/images/gearType.png"}
                alt="gearType"
                width={18}
                height={18}
              />
              <p className={headings.carDescription}>{gearType}</p>
            </div>
          </div>
          <div className={classes.border} />
        </div>
        {showPreviousPrice && (
          <h2 className={`${headings.priceCut} ${classes.textCut}`}>
            {`${CURRENCY}${price.toLocaleString()}`}
          </h2>
        )}
        <div className={classes.priceContainer}>
          <h2 className={headings.priceText}>
            {`${CURRENCY}${price.toLocaleString()}`}
          </h2>
          <div className={classes.btnContainer}>
            <button className={classes.btn}>View Details</button>
            <Image
              src="/images/arrow-blue.png"
              alt="arrow"
              width={14}
              height={14}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
