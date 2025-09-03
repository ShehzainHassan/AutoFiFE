"use client";
import React from "react";
import Modal from "react-modal";
import classes from "./clear-all-modal.module.css";
import { ClearAllModalProps } from "./clear-all-modal.types";

export default function ClearAllModal({
  isOpen,
  deleteAllPending,
  onClose,
  onClearAll,
}: ClearAllModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classes.modal}
      overlayClassName={classes.overlay}
      ariaHideApp={false}>
      <h2>Are you sure you want to delete all chats?</h2>
      <div className={classes.modalActions}>
        <button
          disabled={deleteAllPending}
          onClick={onClearAll}
          className={classes.primaryButton}>
          {deleteAllPending ? "Deleting..." : "Yes"}
        </button>
        <button className={classes.secondaryButton} onClick={onClose}>
          No
        </button>
      </div>
    </Modal>
  );
}
