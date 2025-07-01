import useTracking from "@/hooks/useTracking";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "react-modal";
import ContactFormContainer from "../../contact-info-form/contact-form-container";
import CardBottom from "../card-bottom/card-bottom";
import CardHeader from "../card-header/card-header";
import ContactInfoResultCard from "../contact/contact";
import Features from "../features/features";
import EstimatedMonthly from "../monthly-estimate/monthly-estimate";
import PartnerInfo from "../partner-info/partner-info";
import Rating from "../rating/rating";
import classes from "./car-details.module.css";
import { CarDetailsProps } from "./car-details.types";
import { ContactFormProvider } from "../../../../contexts/contact-form-context/contact-form-context";

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
              aria-label="Close"
              className={classes.closeBtn}
              onClick={() => setIsModalOpen(false)}>
              X
            </button>
          </div>
          <ContactFormProvider>
            <ContactFormContainer carId={id} className={classes.modalContent} />
          </ContactFormProvider>
        </div>
      </Modal>
    </div>
  );
};
export default CarDetails;
