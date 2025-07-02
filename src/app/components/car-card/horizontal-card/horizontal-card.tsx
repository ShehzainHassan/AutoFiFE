import Image from "next/image";
import classes from "./horizontal-card.module.css";
import headings from "@/styles/typography.module.css";
import { CURRENCY } from "@/constants";
import { TagLabel } from "../../tag-label";
import { useRouter } from "next/navigation";
import { HorizontalCardProps } from "./horizontal-card.types";
import { BookmarkIcon} from "@/app/components"
import useTracking from "@/hooks/useTracking";
import SpeedometerIcon from "@/assets/images/icons/speedometer-white.png";
import FuelIcon from "@/assets/images/icons/fuel-white.png";
import GearboxIcon from "@/assets/images/icons/gear-white.png";
import ArrowBlueIcon from "@/assets/images/icons/arrow-blue.png";
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
          loading="lazy"
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
                src={SpeedometerIcon}
                alt="speedometer"
                width={18}
                height={18}
                loading="lazy"
                placeholder="blur"
              />
              <p className={headings.carDescription}>{miles}</p>
            </div>
            <div className={classes.horizontalImgContainer}>
              <Image
                src={FuelIcon}
                alt="diesel"
                width={18}
                height={18}
                loading="lazy"
                placeholder="blur"
              />
              <p className={headings.carDescription}>{fuelType}</p>
            </div>
            <div className={classes.horizontalImgContainer}>
              <Image
                src={GearboxIcon}
                alt="gearType"
                width={18}
                height={18}
                loading="lazy"
                placeholder="blur"
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
            <button aria-label={btnText} className={classes.btn}>
              {btnText}
            </button>
            <Image
              src={ArrowBlueIcon}
              alt="arrow"
              width={14}
              height={14}
              loading="lazy"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
