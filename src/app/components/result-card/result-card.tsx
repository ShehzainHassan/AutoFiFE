import { CURRENCY } from "@/constants";
import { WHITE_THEME } from "@/constants/button-primary-themes";
import useTracking from "@/hooks/useTracking";
import headings from "@/styles/typography.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "react-modal";
import ButtonPrimary from "../buttons/button-primary/button-primary";
import Form from "../contact-info-form/contact-info-form";
import CarImage from "./car-image/car-image";
import HandleLike from "./handle-like/handle-like";
import classes from "./result-card.module.css";
import { ResultCardProps } from "./result-card.types";
import PartnerInfo from "./partner-info/partner-info";
export default function ResultCard({ vehicle, carImg }: ResultCardProps) {
  return (
    <div className={classes.container}>
      <CarImage src={carImg}>
        <HandleLike vehicle={vehicle} />
      </CarImage>
      <CarDetails
        id={vehicle.id}
        carTitle={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        miles={vehicle.mileage}
        price={vehicle.price}
      />
    </div>
  );
}

type CarDetailsProps = {
  id: number;
  specialText?: string;
  miles: number;
  price: number;
  carTitle: string;
};
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
      <Contact setIsModalOpen={setIsModalOpen} />
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
const CardHeader = ({
  carTitle,
  miles,
  price,
}: {
  carTitle: string;
  miles: number;
  price: number;
}) => {
  return (
    <>
      <div className={classes.cardTop}>
        {/* {specialText && <p className={headings.smallText}>{specialText}</p>} */}
        <h1 className={`${headings.carTitle} ${classes.clickableTitle}`}>
          {carTitle}
        </h1>
      </div>
      <div className={classes.distancePrice}>
        <p className={headings.mileage}>{miles.toLocaleString()} mi</p>
        <p className={headings.resultCardPrice}>
          {CURRENCY}
          {price.toLocaleString()}
        </p>
      </div>
    </>
  );
};

const EstimatedMonthly = () => (
  <div className={`${classes.perMonth} ${headings.smallText}`}>
    <p>Est. $388/mo</p>
    <div className={classes.circle}>i</div>
  </div>
);

const Rating = () => (
  <div className={classes.rating}>
    <p className={headings.noRatings}>No rating</p>
  </div>
);

const Features = () => (
  <div className={`${classes.features} ${headings.smallText}`}>
    <p>Leather seats</p>
    <p>.</p>
    <p>Alloy wheels</p>
  </div>
);

const Contact = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (val: boolean) => void;
}) => {
  return (
    <div className={classes.contact}>
      <p className={`${headings.contact} ${classes.blue}`}>01622 237423</p>
      <ThemeProvider value={WHITE_THEME}>
        <ButtonPrimary
          onClick={() => setIsModalOpen(true)}
          btnText="Request info"
        />
      </ThemeProvider>
    </div>
  );
};

const CardBottom = () => (
  <div className={classes.cardBottom}>
    <p>Tonbridge</p>
    <Image src="/images/more.png" alt="more" width={4} height={14} />
  </div>
);
