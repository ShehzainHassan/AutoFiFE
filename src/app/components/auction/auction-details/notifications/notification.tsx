import NotificationContainer from "./notification-container/notification-container";
import classes from "./notification.module.css";
export default function AuctionNotificationSettings() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Notifications</h1>
      <div className={classes.notificationSettingsContainer}>
        <NotificationContainer />
        <NotificationContainer />
        <NotificationContainer />
        <NotificationContainer />
      </div>
    </div>
  );
}
