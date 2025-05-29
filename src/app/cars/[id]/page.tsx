"use client";
import ButtonNavigate from "@/app/components/buttons/Navigate";
import ButtonPrimary from "@/app/components/buttons/Primary";
import CarFeature from "@/app/components/car-feature";
import CarImages from "@/app/components/car-images";
import Form from "@/app/components/contact-info-form";
import EmptyState from "@/app/components/empty-state";
import Footer from "@/app/components/footer";
import LoadingSpinner from "@/app/components/loading-spinner";
import Navbar from "@/app/components/navbar";
import RatingStars from "@/app/components/rating-stars";
import Wrapper from "@/app/components/wrapper";
import { CURRENCY } from "@/constants";
import useVehiclesById from "@/hooks/useVehicleById";
import useVehicleFeatures from "@/hooks/useVehicleFeatures";
import headings from "@/styles/typography.module.css";
import { formatLabel } from "@/utilities/utilities";
import {
  faArrowCircleUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./page.module.css";

export default function CarDetails() {
  const params = useParams();
  const idParam = params.id;
  const id = idParam ? Number(idParam) : undefined;
  const { data: vehicle, isLoading: vehicleLoading } = useVehiclesById(
    id as number
  );
  const make = vehicle?.make ?? "";
  const model = vehicle?.model ?? "";

  const { data: vehicleFeatures, isLoading: featureLoading } =
    useVehicleFeatures(make, model, !!vehicle?.make && !!vehicle.model);
  if (vehicleLoading || featureLoading) {
    return <LoadingSpinner color="var(--color-black500)" />;
  }
  if (!vehicle || !vehicleFeatures)
    return <EmptyState message="Vehicle not found" />;
  const CarInfo = () => {
    return (
      <div>
        <div className={classes.carTitleContainer}>
          <h1 className={classes.carTitle}>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <p className={classes.carPrice}>
            {CURRENCY}
            {vehicle.price.toLocaleString()}
          </p>
        </div>
        <div className={classes.carDetails}>
          <div className={classes.marketPrice}>
            <div className={classes.arrowContainer}>
              <FontAwesomeIcon icon={faArrowCircleUp} />
              <div className={classes.deal}>Great Deal</div>
            </div>
            <div>
              $1,557 below market
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ width: "16px", height: "16px" }}
              />
            </div>
          </div>
          <div className={classes.dealerRating}>
            <p className={classes.dealer}>Dealer rating</p>
            <RatingStars rating={4.5} />
          </div>
        </div>
      </div>
    );
  };

  const CarFinance = () => {
    return (
      <div className={classes.financeContainer}>
        <div className={classes.financeBenefits}>
          <p className={classes.financeText}>Get car finance online</p>
          <ul className={classes.list}>
            <li>No-obligation quote</li>
            <li>Trusted by 1000s</li>
          </ul>
        </div>
        <div className={classes.btnContainer}>
          <Image
            src="/images/CarFinance.png"
            alt="car-finance-logo"
            width={130}
            height={18}
          />
          <ButtonPrimary
            imgSrc="/images/get-quote.png"
            btnText="Get my quote"
            className={classes.button}
          />
        </div>
        <p className={classes.financeBottomText}>
          Representative APR 19.9%. Car Finance 247 Limited is a credit broker,
          not a lender
        </p>
      </div>
    );
  };
  const Features = () => {
    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Features</h1>
        <div className={classes.features}>
          <CarFeature
            title="Mileage"
            value={vehicle.mileage.toLocaleString()}
          />
          <CarFeature
            title="Drivetrain"
            value={formatLabel(vehicleFeatures.features.drivetrain.type)}
          />
          <CarFeature title="Exterior color" value={vehicle.color} />
          {/* <CarFeature title="MPG" value="39 MPG" /> */}
          <CarFeature
            title="Engine"
            value={vehicleFeatures.features.engine.type}
          />
          <CarFeature title="Fuel type" value={vehicle.fuelType} />
          <CarFeature title="Gearbox" value={vehicle.transmission} />
          {/* <CarFeature title="ULEZ compliant" value="Yes" /> */}
        </div>
      </div>
    );
  };
  const Overview = () => {
    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Overview</h1>
        <div className={`${classes.features} ${classes.space}`}>
          <p>
            <strong>Make:</strong> {vehicle.make}
          </p>
          <p>
            <strong>Mileage:</strong> {vehicle.mileage.toLocaleString() + " mi"}
          </p>
          <p>
            <strong>Model:</strong> {vehicle.model}
          </p>
          <p>
            <strong>Condition: </strong>
            {formatLabel(vehicle.status.toLocaleLowerCase())}
          </p>
          <p>
            <strong>Year:</strong> {vehicle.year}
          </p>
          <p>
            <strong>Vin:</strong> {vehicle.vin}
          </p>

          <p>
            <strong>Exterior color:</strong> {vehicle.color}
          </p>
        </div>
      </div>
    );
  };
  const FuelEconomy = () => {
    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Fuel economy</h1>
        <div className={`${classes.features} ${classes.space}`}>
          {vehicleFeatures?.features.fuelEconomy &&
            Object.entries(vehicleFeatures.features.fuelEconomy).map(
              ([key, value]) => (
                <div key={key}>
                  <strong>{formatLabel(key)}</strong>: {value}
                </div>
              )
            )}
        </div>
      </div>
    );
  };
  const Performance = () => {
    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Performance</h1>
        <div className={`${classes.features} ${classes.space}`}>
          {vehicleFeatures?.features.performance &&
            Object.entries(vehicleFeatures.features.performance).map(
              ([key, value]) => (
                <div key={key}>
                  <strong>{formatLabel(key)}</strong>: {value}
                </div>
              )
            )}
        </div>
      </div>
    );
  };
  const Safety = () => {
    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Safety</h1>
        <p>Cruise control</p>
      </div>
    );
  };
  const Measurements = () => {
    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Measurements</h1>
        <div className={`${classes.features} ${classes.space}`}>
          {vehicleFeatures?.features.measurements &&
            Object.entries(vehicleFeatures.features.measurements).map(
              ([key, value]) => (
                <div key={key}>
                  <strong>{formatLabel(key)}</strong>: {value}
                </div>
              )
            )}
        </div>
      </div>
    );
  };
  const Options = () => {
    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Options</h1>
        <div className={`${classes.features} ${classes.space}`}>
          {vehicleFeatures?.features.options.map((option, index) => (
            <p key={index}>{option}</p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar backgroundColor="var(--color-gray600)" />
      <Wrapper padding="24px 240px">
        <div className={classes.container}>
          <div>
            <div className={classes.imgContainer}>
              <Image
                src="/images/glc_2023.png"
                alt="car-img"
                width={740}
                height={340}
              />
              <div className={classes.allImages}>
                <ButtonNavigate type="prev" />
                <CarImages />
                <CarImages />
                <CarImages />
                <CarImages />
                <CarImages />
                <CarImages />
                <ButtonNavigate type="next" />
              </div>
            </div>
            <Features />
            <CarFinance />
            <Overview />
            <FuelEconomy />
            <Performance />
            <Safety />
            <Measurements />
            <Options />
          </div>

          <div>
            <CarInfo />
            <Form />
          </div>
        </div>
      </Wrapper>
      <ToastContainer />
      <Footer />
    </div>
  );
}
