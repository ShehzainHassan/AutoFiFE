import useUserWatchList from "@/hooks/useUserWatchList";
import StatItem from "../../stat-item/stat-item";
import classes from "../auction-info-panel.module.css";
import useUserBids from "@/hooks/useUserBids";
import Loading from "@/app/components/loading";
import ErrorMessage from "@/app/components/error-message";
import { ErrorBoundary } from "@sentry/nextjs";
import { Profiler } from "react";
import { trackRender } from "@/utilities/performance-tracking";

export default function YourStats() {
  const authData = localStorage.getItem("authData") ?? "";

  const {
    data: watchList,
    isLoading: watchLoading,
    isError: watchError,
    error: watchErr,
  } = useUserWatchList(!!authData);

  const {
    data: bids,
    isLoading: bidsLoading,
    isError: bidsError,
    error: bidsErr,
  } = useUserBids(!!authData);

  if (watchLoading || bidsLoading) return <Loading />;

  if (watchError || bidsError) {
    const errMsg =
      watchErr?.message || bidsErr?.message || "Something went wrong.";
    return <ErrorMessage message={errMsg} />;
  }

  if (!watchList || !bids) return null;
  if (!authData) return null;
  return (
    <ErrorBoundary fallback={<div>Failed to Load Your Stats</div>}>
      <Profiler id="YourStats" onRender={trackRender}>
        <p className={`${classes.center} ${classes.text}`}>Your stats</p>
        <div className={classes.statItemContainer}>
          <StatItem label="Bids" value={bids.length} />
          <StatItem label="Watchlists" value={watchList.length} />
        </div>
      </Profiler>
    </ErrorBoundary>
  );
}
