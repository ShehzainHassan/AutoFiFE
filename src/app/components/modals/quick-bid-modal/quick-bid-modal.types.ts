import { Auction } from "@/interfaces/auction";

export interface QuickBidModalProps {
  isOpen: boolean;
  onClose: () => void;
  auction: Auction;
}
