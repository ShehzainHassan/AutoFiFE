"use client";

import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";
import { ManualBid } from "../../auction/auction-details/auction-info-panel/manual-bid-container";
import classes from "./quick-bid-modal.module.css";
import { QuickBidModalProps } from "./quick-bid-modal.types";

export default function QuickBidModal({
  isOpen,
  onClose,
  startingPrice,
  currentBid,
  auctionId,
}: QuickBidModalProps) {
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
        <ManualBid
          startingPrice={startingPrice}
          currentBid={currentBid}
          showBidButton={false}
          auctionId={auctionId}
        />
      </div>
    </Modal>
  );
}
