export type ManualBidProps = {
  startingPrice: number;
  currentBid: number;
};

export type ManualBidViewProps = {
  bid: string;
  setBid: (value: string) => void;
  authData: string;
  currentBid: number;
  startingPrice: number;
  highestId: number | undefined;
  userId: number;
  isPending: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlaceBid: () => void;
  increaseBid: (value: number) => void;
};
