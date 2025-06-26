"use client";
import ButtonPrimary from "@/app/components/buttons/button-primary/button-primary";
import CarFeature from "@/app/components/car-feature/car-feature";
import CarImageGallery from "@/app/components/car-image-gallery/car-image-gallery";
import Form from "@/app/components/contact-info-form/contact-info-form";
import EmptyState from "@/app/components/empty-state/empty-state";
import Footer from "@/app/components/footer/footer";
import Navbar from "@/app/components/navbar/navbar";
import RatingStars from "@/app/components/rating-stars/ratings-stars";
import VehicleRecommendations from "@/app/components/similar-vehicle-recommendations/similar-vehicle-recommendations";
import Wrapper from "@/app/components/wrapper/wrapper";
import { CURRENCY } from "@/constants";
import useVehiclesById from "@/hooks/useVehicleById";
import useVehicleFeatures from "@/hooks/useVehicleFeatures";
import headings from "@/styles/typography.module.css";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
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
    return <CircularProgress />;
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
            <div className={classes.marketContainer}>
              $1,557 below market
              <InfoOutlinedIcon className={classes.icon} />
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
    const router = useRouter();
    const handleQuote = () => {
      router.push(`/finance/${id}`);
    };
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
            onClick={handleQuote}
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
    const featureList = [
      {
        title: "Mileage",
        value: vehicle.mileage.toLocaleString(),
      },
      {
        title: "Drivetrain",
        value: vehicleFeatures.features.drivetrain.type,
      },
      {
        title: "Exterior color",
        value: vehicle.color,
      },
      {
        title: "MPG",
        value: vehicleFeatures.features.fuelEconomy.combinedMPG + " MPG",
      },
      {
        title: "Engine",
        value: vehicleFeatures.features.engine.type,
      },
      {
        title: "Fuel type",
        value: vehicle.fuelType,
      },
      {
        title: "Gearbox",
        value: vehicle.transmission,
      },
    ];

    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Features</h1>
        <div className={classes.features}>
          {featureList.map((feature, index) => (
            <CarFeature
              key={index}
              title={feature.title}
              value={feature.value}
            />
          ))}
        </div>
      </div>
    );
  };
  const Overview = () => {
    const overviewData = [
      { label: "Make", value: vehicle.make },
      { label: "Mileage", value: `${vehicle.mileage.toLocaleString()} mi` },
      { label: "Model", value: vehicle.model },
      { label: "Condition", value: vehicle.status.toLowerCase() },
      { label: "Year", value: vehicle.year },
      { label: "Vin", value: vehicle.vin },
      { label: "Exterior color", value: vehicle.color },
    ];

    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Overview</h1>
        <div className={`${classes.features} ${classes.space}`}>
          {overviewData.map((item, index) => (
            <p key={index}>
              <span className={classes.bold}>{item.label}</span> {item.value}
            </p>
          ))}
        </div>
      </div>
    );
  };
  const FuelEconomy = () => {
    const fuelEconomyData = [
      {
        label: "Fuel Tank Size",
        value: vehicleFeatures.features.fuelEconomy.fuelTankSize + " L",
      },
      {
        label: "Combined MPG",
        value: vehicleFeatures.features.fuelEconomy.combinedMPG + " MPG",
      },
      {
        label: "City MPG",
        value: vehicleFeatures.features.fuelEconomy.cityMPG + " MPG",
      },
      {
        label: "Highway MPG",
        value: vehicleFeatures.features.fuelEconomy.highwayMPG + " MPG",
      },
      {
        label: "CO2 Emissions",
        value: vehicleFeatures.features.fuelEconomy.cO2Emissions + " g/km",
      },
    ];

    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Fuel economy</h1>
        <div className={`${classes.features} ${classes.space}`}>
          {fuelEconomyData.map((item, index) => (
            <p key={index}>
              <span className={classes.bold}>{item.label}:</span> {item.value}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const Performance = () => {
    const performance = [
      {
        label: "Zero To 60 MPH",
        value: vehicleFeatures.features.performance.zeroTo60MPH + " seconds",
      },
      {
        label: "Horsepower",
        value: vehicleFeatures.features.engine.horsepower + " hp",
      },
      {
        label: "Cam Type",
        value: vehicleFeatures.features.engine.camType,
      },
      {
        label: "Engine Size",
        value: vehicleFeatures.features.engine.size,
      },
      {
        label: "Torque FT LBS",
        value: vehicleFeatures.features.engine.torqueFtLBS,
      },
      {
        label: "Torque RPM",
        value: vehicleFeatures.features.engine.torqueRPM,
      },
      {
        label: "Valves",
        value: vehicleFeatures.features.engine.valves,
      },
    ];

    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Performance</h1>
        <div className={`${classes.features} ${classes.space}`}>
          {performance.map((item, index) => (
            <p key={index}>
              <span className={classes.bold}>{item.label}:</span> {item.value}
            </p>
          ))}
        </div>
      </div>
    );
  };
  // const Safety = () => {
  //   return (
  //     <div className={classes.titleContainer}>
  //       <h1 className={headings.carPageTitle}>Safety</h1>
  //       <p>Cruise control</p>
  //     </div>
  //   );
  // };
  const Measurements = () => {
    const measurementsData = [
      {
        label: "Doors",
        value: vehicleFeatures.features.measurements.doors + " doors",
      },
      {
        label: "Maximum Seating",
        value: vehicleFeatures.features.measurements.maximumSeating,
      },
      {
        label: "Height",
        value: vehicleFeatures.features.measurements.heightInches + " in",
      },
      {
        label: "Width",
        value: vehicleFeatures.features.measurements.widthInches + " in",
      },
      {
        label: "Length",
        value: vehicleFeatures.features.measurements.lengthInches + " in",
      },
      {
        label: "Wheelbase",
        value: vehicleFeatures.features.measurements.wheelbaseInches + " in",
      },
      {
        label: "Ground Clearance",
        value: vehicleFeatures.features.measurements.groundClearance + " in",
      },
      {
        label: "Cargo Capacity",
        value:
          vehicleFeatures.features.measurements.cargoCapacityCuFt + " cuft",
      },
      {
        label: "Curb Weight",
        value: vehicleFeatures.features.measurements.curbWeightLBS + " lbs",
      },
    ];

    return (
      <div className={classes.titleContainer}>
        <h1 className={headings.carPageTitle}>Measurements</h1>
        <div className={`${classes.features} ${classes.space}`}>
          {measurementsData.map((item, index) => (
            <p key={index}>
              <span className={classes.bold}>{item.label}:</span> {item.value}
            </p>
          ))}
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
          <div className={classes.vehicleFeatures}>
            <CarImageGallery vehicle={vehicle} />
            <Features />
            <CarFinance />
            <Overview />
            <FuelEconomy />
            <Performance />
            {/* <Safety /> */}
            <Measurements />
            <Options />
          </div>

          <div className={classes.vehicleFeatures}>
            <CarInfo />
            <Form />
          </div>
        </div>
        <div className={classes.vehicleFeatures}>
          <VehicleRecommendations />
        </div>
      </Wrapper>

      <ToastContainer />
      <Footer />
    </div>
  );
}
