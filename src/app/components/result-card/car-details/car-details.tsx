import { useRouter } from "next/navigation";
import { CarDetailsProps } from "./car-details.types";
import { useState } from "react";
import useTracking from "@/hooks/useTracking";
import classes from "./car-details.module.css";
import CardHeader from "../card-header/card-header";
import PartnerInfo from "../partner-info/partner-info";
import EstimatedMonthly from "../monthly-estimate/monthly-estimate";
import Rating from "../rating/rating";
import Features from "../features/features";
import ContactInfoResultCard from "../contact/contact";
import Modal from "react-modal";
import CardBottom from "../card-bottom/card-bottom";
import Form from "../../contact-info-form/contact-info-form";

const CarDetails = ({ id, carTitle, miles, price }: CarDetailsProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addInteraction = useTracking();
  const handleRedirect = () => {
    router.push(`/cars/${id}`);
    addInteraction.mutate({ vehicleId: id, interactionType: "view" });
  };
  return (
    <div className={classes.carDetails}>
      <div onClick={handleRedirect}>
        <CardHeader {...{ carTitle, miles, price }} />
        <div className={classes.cardMiddle}>
          <PartnerInfo />
          <EstimatedMonthly />
        </div>

        <Rating />
        <Features />
      </div>
      <ContactInfoResultCard setIsModalOpen={setIsModalOpen} />
      <CardBottom />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Request Info Modal"
        ariaHideApp={false}
        className={classes.modal}
        overlayClassName={classes.overlay}>
        <div>
          <div className={classes.modalHeader}>
            <h2>Request information</h2>
            <button
              className={classes.closeBtn}
              onClick={() => setIsModalOpen(false)}>
              X
            </button>
          </div>
          <Form carId={id} className={classes.modalContent} />
        </div>
      </Modal>
    </div>
  );
};
export default CarDetails;
