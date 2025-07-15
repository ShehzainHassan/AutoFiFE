import useUserWatchList from "@/hooks/useUserWatchList";
import useUserBids from "@/hooks/useUserBids";
import StatItem from "../../stat-item/stat-item";
import classes from "../auction-info-panel.module.css";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import Loading from "@/app/components/loading";
import ErrorMessage from "@/app/components/error-message";

export default function YourStats() {
  const userId = getUserIdFromLocalStorage() ?? -1;
  const authData = localStorage.getItem("authData") ?? "";

  const {
    data: watchList,
    isLoading: watchLoading,
    isError: watchError,
    error: watchErr,
  } = useUserWatchList(userId);

  const {
    data: bids,
    isLoading: bidsLoading,
    isError: bidsError,
    error: bidsErr,
  } = useUserBids(userId);

  if (watchLoading || bidsLoading) return <Loading />;

  if (watchError || bidsError) {
    const errMsg =
      watchErr?.message || bidsErr?.message || "Something went wrong.";
    return <ErrorMessage message={errMsg} />;
  }

  if (!watchList || !bids) return null;
  if (!authData) return null;
  return (
    <>
      <p className={`${classes.center} ${classes.text}`}>Your stats</p>
      <div className={classes.statItemContainer}>
        <StatItem label="Bids" value={bids.length} />
        <StatItem label="Watchlists" value={watchList.length} />
      </div>
    </>
  );
}
