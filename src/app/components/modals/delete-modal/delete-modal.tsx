"use client";
import React from "react";
import Modal from "react-modal";
import classes from "./delete-modal.module.css";
import { DeleteModalProps } from "./delete-modal.types";

export default function DeleteSessionModal({
  isOpen,
  deleteSessionPending,
  onClose,
  onDelete,
}: DeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classes.modal}
      overlayClassName={classes.overlay}
      ariaHideApp={false}>
      <h2>Are you sure you want to delete this session?</h2>
      <div className={classes.modalActions}>
        <button
          disabled={deleteSessionPending}
          onClick={onDelete}
          className={classes.primaryButton}>
          {deleteSessionPending ? "Deleting..." : "Yes"}
        </button>
        <button className={classes.secondaryButton} onClick={onClose}>
          No
        </button>
      </div>
    </Modal>
  );
}
