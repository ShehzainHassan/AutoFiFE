import { getAuctionConnection } from "@/utilities/signalRManager";
import { useEffect } from "react";

export function useBidUpdates(auctionId: number, onNewBid: () => void) {
  useEffect(() => {
    if (auctionId <= 0) return;

    const connection = getAuctionConnection(auctionId);

    const handler = (id: number) => {
      if (id === auctionId) {
        console.log("📩 Received new bid:", id);
        onNewBid();
      }
    };

    connection.on("ReceiveNewBid", handler);

    if (connection.state === "Disconnected") {
      connection
        .start()
        .then(() => console.log("SignalR connection started"))
        .catch((err) =>
          console.error("Failed to start SignalR connection", err)
        );
    }

    return () => {
      connection.off("ReceiveNewBid", handler);
    };
  }, [auctionId, onNewBid]);
}
