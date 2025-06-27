import Image from "next/image";
import classes from "./card-bottom.module.css";
import MoreIcon from "@/assets/images/icons/more.png";
const CardBottom = () => (
  <div className={classes.cardBottom}>
    <p>Tonbridge</p>
    <Image
      src={MoreIcon}
      alt="more"
      width={4}
      height={14}
      loading="lazy"
      placeholder="blur"
    />
  </div>
);

export default CardBottom;
