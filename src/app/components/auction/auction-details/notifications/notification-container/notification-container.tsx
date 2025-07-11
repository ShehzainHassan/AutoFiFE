import CarImage from "@/app/components/result-card/car-image/car-image";
import TextContainer from "../../text-container/text-container";
import classes from "./notification-container.module.css";
export default function NotificationContainer() {
  return (
    <div className={classes.container}>
      <div className={classes.notificationDetailsContainer}>
        <div className={classes.notificationDetails}>
          <h3>Auction Alerts</h3>
          <p>
            Stay informed about your bidding activity, watchlist updates, and
            auction ending warnings.
          </p>
        </div>
        <TextContainer value="Manage" />
      </div>
      <div className={classes.imageWrapper}>
        <CarImage src="/images/glc_2023.png" />
      </div>
    </div>
  );
}
