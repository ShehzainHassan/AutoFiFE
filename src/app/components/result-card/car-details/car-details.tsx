import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import useTracking from "@/hooks/useTracking";
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

  const handleRedirect = useCallback(() => {
    router.push(`/cars/${id}`);
    addInteraction.mutate({ vehicleId: id, interactionType: "view" });
  }, [id, router, addInteraction]);

  return (
    <section className={classes.carDetails} aria-labelledby={`car-${id}-title`}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleRedirect}
        className={classes.cardTop}
        onKeyDown={(e) => e.key === "Enter" && handleRedirect()}
        aria-label={`View details for ${carTitle}`}>
        <CardHeader {...{ carTitle, miles, price }} />
        <div className={classes.cardMiddle}>
          <PartnerInfo />
          <EstimatedMonthly />
        </div>
        <Rating />
        <Features features="Leather seats . Alloy wheels" />
      </div>

      <ContactInfoResultCard setIsModalOpen={setIsModalOpen} />
      <CardBottom />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Request Info Modal"
        ariaHideApp={false}
        aria-modal="true"
        className={classes.modal}
        overlayClassName={classes.overlay}>
        <div>
          <div className={classes.modalHeader}>
            <h2 id={`car-${id}-title`}>Request information</h2>
            <button
              aria-label="Close modal"
              className={classes.closeBtn}
              onClick={() => setIsModalOpen(false)}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <ContactFormProvider>
            <ContactFormContainer carId={id} className={classes.modalContent} />
          </ContactFormProvider>
        </div>
      </Modal>
    </section>
  );
};

export default CarDetails;
