import Image from "next/image";
import classes from "./horizontal-card.module.css";
import headings from "@/styles/typography.module.css";
import { CURRENCY } from "@/constants";
import { TagLabel } from "../../tag-label";
import { useRouter } from "next/navigation";
import { HorizontalCardProps } from "./horizontal-card.types";
import BookmarkIcon from "../../bookmark-icon/bookmark-icon";
import useTracking from "@/hooks/useTracking";

export default function HorizontalCarCard({
  id,
  imgSrc,
  carDetails,
  carDescription,
  miles,
  fuelType,
  gearType,
  price,
  tag,
  tagColor = "var(--color-blue500)",
  btnText = "View Details",
  showPreviousPrice = false,
}: HorizontalCardProps) {
  const router = useRouter();
  const addInteraction = useTracking();
  const redirectToCarDetails = () => {
    router.push(`/cars/${id}`);
    addInteraction.mutate({ vehicleId: id, interactionType: "view" });
  };
  return (
    <div className={classes.horizontalContainer} onClick={redirectToCarDetails}>
      <div className={classes.horizontalImgWrapper}>
        <Image
          src={imgSrc}
          alt="car-name"
          className={classes.horizontalCarImg}
          width={318}
          height={0}
          style={{ height: "100%" }}
        />
        {tag && <TagLabel text={tag} color={tagColor} />}
        <BookmarkIcon />
      </div>
      <div className={classes.horizontalCarDetails}>
        <div className={classes.carInfo}>
          <h2 className={headings.brandText}>{carDetails}</h2>
          <p className={`${headings.carDescription} ${classes.truncate}`}>
            {carDescription}
          </p>
        </div>
        <div className={classes.mileage}>
          <div className={classes.horizontalMileageDetails}>
            <div className={classes.horizontalImgContainer}>
              <Image
                src="/images/speedometer-white.png"
                alt="speedometer"
                width={18}
                height={18}
              />
              <p className={headings.carDescription}>{miles}</p>
            </div>
            <div className={classes.horizontalImgContainer}>
              <Image
                src="/images/fuel-white.png"
                alt="diesel"
                width={18}
                height={18}
              />
              <p className={headings.carDescription}>{fuelType}</p>
            </div>
            <div className={classes.horizontalImgContainer}>
              <Image
                src="/images/gear-white.png"
                alt="gearType"
                width={18}
                height={18}
              />
              <p className={headings.carDescription}>{gearType}</p>
            </div>
          </div>
        </div>
        {showPreviousPrice && (
          <h2 className={`${headings.priceCut} ${classes.textCut}`}>
            {`${CURRENCY}${price.toLocaleString()}`}
          </h2>
        )}
        <div className={classes.priceContainer}>
          <h2
            className={
              headings.priceText
            }>{`${CURRENCY}${price.toLocaleString()}`}</h2>
          <div className={classes.btnContainer}>
            <button className={classes.btn}>{btnText}</button>
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
