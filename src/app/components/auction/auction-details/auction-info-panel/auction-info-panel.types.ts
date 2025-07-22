export type AuctionInfoPanelProps = {
  vehiclePrice: number;
};

export type AutoBidTypeProps = {
  auctionId: number;
  startingPrice: number;
  currentBid: number;
};

export type ManualBidProps = {
  startingPrice: number;
  currentBid: number;
  bid: string;
  setBid: (val: string) => void;
};
