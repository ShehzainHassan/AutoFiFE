export type SavedVehiclesViewProps = {
  auctions: {
    auctionId: number;
    currentPrice: number;
    vehicle: {
      make: string;
      model: string;
      year: number;
    };
  }[];
  onAuctionClick: (auctionId: number) => void;
  viewType: "Grid" | "List";
};

export type SavedVehicleContainerProps = {
  viewType: "Grid" | "List";
};
