export interface AutoPlaceBidViewProps {
  maxBidAmount: string;
  biddingStrategy: string;
  timingPreference: string;
  bidDelaySeconds: string;
  maxBidsPerMinute: string;
  totalBids: string;
  isActive: boolean | null;
  startingPrice: number;
  currentBid: number;
  isAutoBidSet: boolean;
  authData: string;
  isLoading: boolean;
  isDisabled: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStrategyChange: (value: string) => void;
  onTimingChange: (value: string) => void;
  onBidDelayChange: (value: string) => void;
  onMaxBidsChange: (value: string) => void;
  onTotalBidsChange: (value: string) => void;
  onStatusChange: (value: boolean) => void;
  onSubmit: () => void;
}
