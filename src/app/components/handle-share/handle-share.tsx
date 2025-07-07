"use client";
import { useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import classes from "./handle-share.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "next/navigation";
import useTracking from "@/hooks/useTracking";
import ShareIcon from "@/assets/images/icons/share.png";

export default function HandleShare() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addInteraction = useTracking();
  const params = useParams();
  const idParam = params.id;
  const id = idParam ? Number(idParam) : -1;

  const handleShareClick = () => {
    const url = window.location.href;

    navigator.clipboard.writeText(url).then(() => {
      setIsModalOpen(true);
      addInteraction.mutate({
        vehicleId: id,
        interactionType: "share",
      });
    });
  };

  return (
    <>
      <div className={classes.imgContainer} onClick={handleShareClick}>
        <Image
          src={ShareIcon}
          alt="share"
          width={22}
          height={22}
          loading="lazy"
          placeholder="blur"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Share Modal"
        className={classes.modal}
        overlayClassName={classes.overlay}
        ariaHideApp={false}>
        <button
          aria-label="Close"
          className={classes.closeButton}
          onClick={() => setIsModalOpen(false)}>
          <CloseIcon />
        </button>
        <div className={classes.modalContent}>
          <CheckCircleIcon className={classes.successIcon} />
          <p className={classes.modalText}>URL Copied!</p>
        </div>
      </Modal>
    </>
  );
}
