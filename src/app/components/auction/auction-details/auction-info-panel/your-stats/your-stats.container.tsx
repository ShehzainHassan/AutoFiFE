import ErrorMessage from "@/app/components/error-message";
import Loading from "@/app/components/loading";
import useUserBids from "@/hooks/useUserBids";
import useUserWatchList from "@/hooks/useUserWatchList";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import YourStats from "./your-stats";

export default function YourStatsContainer() {
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
  return <YourStats bidCount={bids.length} watchCount={watchList.length} />;
}
