import { Auction } from "@/interfaces/auction";

export type TimerUnitProps = {
  label: string;
  value: string | number;
};
export interface AuctionTimerProps {
  auction: Auction;
  onTimerEnd?: () => void;
}
