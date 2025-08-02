import * as signalR from "@microsoft/signalr";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const connections: Record<number, signalR.HubConnection> = {};

export function getAuctionConnection(auctionId: number): signalR.HubConnection {
  if (connections[auctionId]) return connections[auctionId];

  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${API_BASE_URL}/hubs/auction?auctionId=${auctionId}`, {
      accessTokenFactory: () => {
        const authData = localStorage.getItem("authData");
        if (!authData) return "";
        const { token } = JSON.parse(authData);
        return token;
      },
    })
    .withAutomaticReconnect()
    .build();

  connections[auctionId] = connection;
  return connection;
}
