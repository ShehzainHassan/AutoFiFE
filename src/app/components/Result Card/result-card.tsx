import Image from "next/image";
import classes from "./result-card.module.css";
import headings from "@/styles/typography.module.css";
import ButtonPrimary from "../Buttons/Primary/primary";

export default function ResultCard() {
  return (
    <div className={classes.container}>
      <div className={classes.carImg}>
        <Image
          src="/images/Bentley-Arnage4.4.png"
          alt="car-img"
          width={360}
          height={200}
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
          <p>New arrival</p>
          <h1 className={headings.filterText}>1998 Bentley Arnage 4.4</h1>
        </div>
        <div className={classes.distancePrice}>
          <p>102,850 mi</p>
          <p>$11,995</p>
        </div>
        <div className={classes.cardMiddle}>
          <div className={classes.partner}>
            <Image
              src="/images/partner.png"
              alt="partner"
              width={16}
              height={16}
            />
            <p>CarGurus partner</p>
          </div>
          <div className={classes.perMonth}>
            <p>Est. $388/mo</p>
            <div className={classes.circle}>i</div>
          </div>
        </div>
        <div className={classes.rating}>
          <p>No rating</p>
        </div>
        <div className={classes.features}>
          <p>Leather seats</p>
          <p>.</p>
          <p>Alloy wheels</p>
        </div>
        <div className={classes.contact}>
          <p>01622 237423</p>
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
