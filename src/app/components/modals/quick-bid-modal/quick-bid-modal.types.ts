import { ManualBidProps } from "../../auction/auction-details/auction-info-panel/manual-bid-container/manual-bid.types";

export interface QuickBidModalProps extends ManualBidProps {
  isOpen: boolean;
  onClose: () => void;
  auctionId: number;
}
