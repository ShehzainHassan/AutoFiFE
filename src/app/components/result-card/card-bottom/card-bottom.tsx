import Image from "next/image";
import classes from "./card-bottom.module.css";
const CardBottom = () => (
  <div className={classes.cardBottom}>
    <p>Tonbridge</p>
    <Image src="/images/more.png" alt="more" width={4} height={14} />
  </div>
);

export default CardBottom;
