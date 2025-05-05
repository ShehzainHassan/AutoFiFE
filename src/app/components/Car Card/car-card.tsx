import Image from "next/image";
import classes from "./car-card.module.css";
import headings from "@/styles/typography.module.css";

type CarCardProps = {
  imgSrc: string;
  carDetails: string;
  carDescription: string;
  miles: string;
  fuelType: string;
  gearType: string;
  price: string;
  tag?: string;
  tagColor?: string;
  cardType?: "vertical" | "horizontal";
  showPreviousPrice?: boolean;
};
export default function CarCard({
  imgSrc,
  carDetails,
  carDescription,
  miles,
  fuelType,
  gearType,
  price,
  tag,
  tagColor,
  cardType = "vertical",
  showPreviousPrice = false,
}: CarCardProps) {
  return (
    <div
      className={
        cardType === "vertical"
          ? classes.container
          : classes.horizontalContainer
      }>
      {tag && cardType === "vertical" && (
        <div className={classes.tag} style={{ backgroundColor: tagColor }}>
          {tag}
        </div>
      )}
      {cardType === "vertical" && (
        <div className={classes.bookmark}>
          <Image
            src="/images/bookmark.png"
            alt="bookmark"
            width={14}
            height={14}
          />
        </div>
      )}
      <div
        className={
          cardType === "vertical"
            ? classes.imgWrapper
            : classes.horizontalImgWrapper
        }>
        {cardType === "vertical" ? (
          <Image src={imgSrc} alt="car-name" className={classes.carImg} fill />
        ) : (
          <Image
            src={imgSrc}
            alt="car-name"
            className={classes.horizontalCarImg}
            width={318}
            height={0}
            style={{ height: "100%" }}
          />
        )}
        {cardType === "horizontal" && (
          <div className={classes.tag} style={{ backgroundColor: tagColor }}>
            {tag}
          </div>
        )}

        {cardType === "horizontal" && (
          <div className={classes.bookmark}>
            <Image
              src="/images/bookmark.png"
              alt="bookmark"
              width={14}
              height={14}
            />
          </div>
        )}
      </div>

      <div
        className={
          cardType === "vertical"
            ? classes.carDetails
            : classes.horizontalCarDetails
        }>
        <div className={classes.carInfo}>
          <h2 className={headings.brandText}>{carDetails}</h2>
          <p className={`${headings.carDescription} ${classes.truncate}`}>
            {carDescription}
          </p>
        </div>
        <div className={classes.mileage}>
          {cardType === "vertical" && <div className={classes.border} />}
          <div
            className={
              cardType === "vertical"
                ? classes.mileageDetails
                : classes.horizontalMileageDetails
            }>
            <div
              className={
                cardType === "vertical"
                  ? classes.imgContainer
                  : classes.horizontalImgContainer
              }>
              <Image
                src={
                  cardType === "vertical"
                    ? "/images/speedometer.png"
                    : "/images/speedometer-white.png"
                }
                alt="speedometer"
                width={18}
                height={18}
              />
              <p className={headings.carDescription}>{miles}</p>
            </div>
            <div
              className={
                cardType === "vertical"
                  ? classes.imgContainer
                  : classes.horizontalImgContainer
              }>
              <Image
                src={
                  cardType === "vertical"
                    ? "/images/diesel.svg"
                    : "/images/fuel-white.png"
                }
                alt="diesel"
                width={18}
                height={18}
              />
              <p className={headings.carDescription}>{fuelType}</p>
            </div>
            <div
              className={
                cardType === "vertical"
                  ? classes.imgContainer
                  : classes.horizontalImgContainer
              }>
              <Image
                src={
                  cardType === "vertical"
                    ? "/images/gearType.png"
                    : "/images/gear-white.png"
                }
                alt="gearType"
                width={18}
                height={18}
              />
              <p className={headings.carDescription}>{gearType}</p>
            </div>
          </div>
          {cardType === "vertical" && <div className={classes.border} />}
        </div>
        {showPreviousPrice && (
          <h2 className={`${headings.priceCut} ${classes.textCut}`}>{price}</h2>
        )}
        <div className={classes.priceContainer}>
          <h2 className={headings.priceText}>{price}</h2>
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
