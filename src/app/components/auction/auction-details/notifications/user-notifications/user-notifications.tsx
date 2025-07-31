import ErrorMessage from "@/app/components/error-message";
import Loading from "@/app/components/loading";
import CarImage from "@/app/components/result-card/car-image/car-image";
import vehicleImg from "@/assets/images/cars/Bentley-Arnage4.4.png";
import { usePanel } from "@/contexts/panel-context/panel-context";
import useGetUserNotifications from "@/hooks/useGetUserNotifications";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import TextContainer from "../../text-container/text-container";
import classes from "./user-notifications.module.css";
export default function UserNotifications() {
  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useGetUserNotifications(getUserIdFromLocalStorage() ?? -1);
  const router = useRouter();
  const { togglePanel } = usePanel();
  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!notifications) return;
  if (notifications.totalItems === 0) return <p>No new notifications</p>;
  const redirectToCheckout = (id: number) => {
    togglePanel("none");
    router.push(`/auction/${id}/checkout`);
  };
  return notifications.items.map((notification) => (
    <div className={classes.auctionWonContainer} key={notification.createdAt}>
      <div className={classes.header}>
        <h3>{notification.title}</h3>
        <p className={classes.message}>{notification.message}</p>

        <TextContainer
          value="Checkout"
          className={classes.textContainer}
          onClick={() => redirectToCheckout(notification.auctionId ?? -1)}
        />
      </div>
      <CarImage src={vehicleImg} />
    </div>
  ));
}
