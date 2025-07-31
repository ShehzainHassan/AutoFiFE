import { getAuctionConnection } from "@/utilities/signalRManager";
import { useEffect } from "react";

export function useSignalNotifications(
  auctionId: number,
  onNewBid?: () => void,
  onAuctionEnd?: () => void
) {
  useEffect(() => {
    if (auctionId <= 0) return;

    const connection = getAuctionConnection(auctionId);

    const handleNewBid = () => {
      onNewBid?.();
    };

    const handleAuctionEnd = () => {
      onAuctionEnd?.();
    };

    connection.on("ReceiveNewBid", handleNewBid);
    connection.on("AuctionEnded", handleAuctionEnd);
    if (connection.state === "Disconnected") {
      connection
        .start()
        .then(() => console.log("SignalR connection started"))
        .catch((err) =>
          console.error("Failed to start SignalR connection", err)
        );
    }

    return () => {
      connection.off("ReceiveNewBid", handleNewBid);
      connection.off("AuctionEnded", handleAuctionEnd);
    };
  }, [auctionId, onNewBid, onAuctionEnd]);
}
