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

    const handleNewBid = (id: number) => {
      if (id === auctionId) {
        console.log("Received new bid:", id);
        onNewBid?.();
      }
    };
    const handleAuctionEnd = (id: number) => {
      if (id === auctionId) {
        console.log("Auction ended:", id);
        onAuctionEnd?.();
      }
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
    };
  }, [auctionId, onNewBid, onAuctionEnd]);
}
