"use client";

import auctionAPI from "@/api/auctionAPI";
import * as signalR from "@microsoft/signalr";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { createContext, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const SignalRContext = createContext<boolean>(false);

export function SignalRProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const match = pathname.match(/\/auction\/(\d+)/);
  const auctionId = match ? parseInt(match[1]) : null;

  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (!authData) return;

    const { token } = JSON.parse(authData);

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/hubs/auction`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveNewBid", async (data: { auctionId: number }) => {
      console.log("ReceiveNewBid", data.auctionId);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["highest-bidder", data.auctionId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["bidHistory", data.auctionId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["auctionById", data.auctionId],
        }),
      ]);
    });

    connection.on(
      "AuctionEnded",
      async (data: {
        auctionId: number;
        finalPrice: number;
        isReserveMet: boolean;
      }) => {
        console.log("AuctionEnded", data.auctionId);
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["auctionById", data.auctionId],
          }),
          queryClient.invalidateQueries({
            queryKey: ["auctionResult", data.auctionId],
          }),
        ]);

        await queryClient.invalidateQueries({
          queryKey: ["userNotifications"],
        });
        await queryClient.invalidateQueries({ queryKey: ["unread-count"] });
        await auctionAPI.trackAuctionCompletion(
          data.auctionId,
          data.isReserveMet,
          data.finalPrice
        );
      }
    );

    connection.on("Outbid", async (data: { auctionId: number }) => {
      console.log("⚠️ You have been outbid in auction:", data.auctionId);
      await queryClient.invalidateQueries({ queryKey: ["userNotifications"] });
      await queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    });
    connection.on(
      "AuctionStatusChanged",
      async (data: { auctionId: number; newStatus: string }) => {
        console.log(`Auction ${data.auctionId} is now in: ${data.newStatus}`);

        await queryClient.invalidateQueries({
          queryKey: ["userNotifications"],
        });
        await queryClient.invalidateQueries({ queryKey: ["unread-count"] });
      }
    );

    connection.on(
      "AutoBidExecuted",
      async (data: { auctionId: number; amount: number }) => {
        console.log(
          `AutoBid placed on Auction ID: ${data.auctionId}, Amount: ${data.amount}`
        );

        await queryClient.invalidateQueries({
          queryKey: ["userNotifications"],
        });
        await queryClient.invalidateQueries({ queryKey: ["unread-count"] });
      }
    );

    connection.on(
      "BidderCountUpdated",
      async (data: { auctionId: number; activeBidders: number }) => {
        console.log(
          `Updated bidder count for auction ${data.auctionId}: ${data.activeBidders}`
        );

        await queryClient.invalidateQueries({
          queryKey: ["userNotifications"],
        });
        await queryClient.invalidateQueries({ queryKey: ["unread-count"] });
      }
    );
    connection.on("ReservePriceMet", async (data: { auctionId: number }) => {
      console.log("ReservePriceMet", data.auctionId);

      await queryClient.invalidateQueries({ queryKey: ["userNotifications"] });
      await queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    });

    connection.on("AuctionExtended", async (data: { auctionId: number }) => {
      console.log("AuctionExtended", data.auctionId);

      await queryClient.invalidateQueries({ queryKey: ["userNotifications"] });
      await queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    });

    connection
      .start()
      .then(async () => {
        console.log("✅ SignalR connected");
        if (auctionId) {
          await connection.invoke("JoinAuctionGroup", auctionId);
          console.log("Joined group auction-" + auctionId);
        }
      })
      .catch((err) => console.error("❌ SignalR connection failed", err));

    connection.onreconnected(async () => {
      console.log("SignalR reconnected");
      if (auctionId) {
        await connection.invoke("JoinAuctionGroup", auctionId);
      }
    });

    return () => {
      connection.stop();
    };
  }, [queryClient, pathname, auctionId]);

  return (
    <SignalRContext.Provider value={true}>{children}</SignalRContext.Provider>
  );
}
