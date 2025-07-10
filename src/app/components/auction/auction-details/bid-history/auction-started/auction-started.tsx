import CalenderIcon from "@/assets/images/icons/calender.png";
import Image from "next/image";
import classes from "../bid-history.module.css";
import dateClasses from "./auction-started.module.css";
export default function AuctionStarted() {
  return (
    <div className={classes.container}>
      <div className={dateClasses.dateContainer}>
        <Image src={CalenderIcon} alt="calender-icon" width={24} height={24} />
      </div>
      <div className={classes.bidDetails}>
        <p>Auction Started</p>
        <span className={classes.bidAmount}>June 15, 2024 </span>
      </div>
    </div>
  );
}
