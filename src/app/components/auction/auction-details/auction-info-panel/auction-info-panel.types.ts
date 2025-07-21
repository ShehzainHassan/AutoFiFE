export type AuctionInfoPanelProps = {
  price: number;
  endUtc: string;
  startingPrice: number;
  currentBid: number;
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
