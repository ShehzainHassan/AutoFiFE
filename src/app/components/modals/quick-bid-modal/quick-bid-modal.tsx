"use client";

import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";
import classes from "./quick-bid-modal.module.css";
import { QuickBidModalProps } from "./quick-bid-modal.types";
import { BidSection } from "../../auction/auction-details/auction-info-panel/bid-section";

export default function QuickBidModal({
  isOpen,
  onClose,
  auction,
}: QuickBidModalProps) {
  const hasLocallyEnded = new Date(auction.endUtc) < new Date();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Quick Bid Modal"
      className={classes.modal}
      overlayClassName={classes.overlay}
      ariaHideApp={false}>
      <button
        aria-label="Close"
        className={classes.closeButton}
        onClick={onClose}>
        <CloseIcon />
      </button>

      <div className={classes.modalContent}>
        <BidSection
          auctionId={auction.auctionId}
          currentBid={auction.currentPrice}
          startingPrice={auction.startingPrice}
          status={auction.status}
          hasLocallyEnded={hasLocallyEnded}
        />
      </div>
    </Modal>
  );
}
