"use client";
import React from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./edit-modal.module.css";
import { EditModalProps } from "./edit-modal.types";

export default function EditSessionModal({
  isOpen,
  currentTitle,
  editSessionPending,
  onClose,
  onChange,
  onUpdate,
}: EditModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classes.modal}
      overlayClassName={classes.overlay}
      ariaHideApp={false}>
      <button
        className={classes.closeButton}
        onClick={onClose}
        aria-label="Close edit dialog">
        <CloseIcon />
      </button>
      <h2>Edit Chat Title</h2>
      <input
        type="text"
        className={classes.input}
        value={currentTitle}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
      <div className={classes.modalActions}>
        <button
          disabled={!currentTitle.trim() || editSessionPending}
          onClick={onUpdate}
          className={classes.primaryButton}>
          {editSessionPending ? "Updating..." : "Update Session Title"}
        </button>
        <button className={classes.secondaryButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
