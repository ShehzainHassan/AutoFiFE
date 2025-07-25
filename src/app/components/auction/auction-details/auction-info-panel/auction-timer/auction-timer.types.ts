import { Auction } from "@/interfaces/auction";

export type AuctionTimerProps = {
  auction: Auction;
  onTimerEnd: () => void;
};

export type TimerUnitProps = {
  label: string;
  value: string | number;
};
