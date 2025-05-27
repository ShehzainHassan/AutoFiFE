"use client";
import ButtonPrimary from "@/app/components/buttons/Primary";
import CarFeature from "@/app/components/car-feature";
import CarImages from "@/app/components/car-images";
import Dropdown from "@/app/components/dropdown";
import Footer from "@/app/components/footer";
import Input from "@/app/components/input";
import Navbar from "@/app/components/navbar";
import RatingStars from "@/app/components/rating-stars";
import Wrapper from "@/app/components/wrapper";
import useVehiclesById from "@/hooks/useVehicleById";
import useVehicleFeatures from "@/hooks/useVehicleFeatures";
import { customSelectStyles } from "@/styles/custom-select";
import headings from "@/styles/typography.module.css";
import { formatLabel } from "@/utilities/utilities";
import {
  faArrowCircleUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import classes from "./page.module.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ThemeProvider } from "@/theme/themeContext";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import EmptyState from "@/app/components/empty-state";
import { CURRENCY } from "@/constants";
import LoadingSpinner from "@/app/components/loading-spinner";

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
  const DropdownOptions = () => {
    const [selected, setSelected] = useState("interested");
    const options = [
      { label: "I'm interested in this", value: "interested" },
      { label: "I'm interested in this", value: "_interested" },
    ];
    return (
      <Dropdown
        className={classes.dropdown}
        value={selected}
        onChange={(value) => {
          setSelected(value);
        }}>
        <Dropdown.Select options={options} styles={customSelectStyles} />
      </Dropdown>
    );
  };
  const InputFirstName = () => {
    const [fname, setFname] = useState("");
    return (
      <Input
        width="160px"
        placeholder="First name"
        value={fname}
        onChange={(e) => setFname(e.target.value)}>
        <Input.Field />
      </Input>
    );
  };
  const InputLastName = () => {
    const [lname, setLname] = useState("");
    return (
      <Input
        width="160px"
        placeholder="Last name"
        value={lname}
        onChange={(e) => setLname(e.target.value)}>
        <Input.Field />
      </Input>
    );
  };
  const InputPostCode = () => {
    const [postCode, setPostCode] = useState(0);
    return (
      <Input
        type="number"
        width="100px"
        placeholder="54000"
        value={postCode}
        onChange={(e) => setPostCode(Number(e.target.value))}>
        <Input.Field />
      </Input>
    );
  };
  const InputEmail = () => {
    const [email, setEmail] = useState("");
    return (
      <Input
        width="260px"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}>
        <Input.Field />
      </Input>
    );
  };
  const InputPhone = () => {
    const [phone, setPhone] = useState("");
    return (
      <Input
        placeholder="0770 000 000"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}>
        <Input.Field />
      </Input>
    );
  };
  const Form = () => {
    return (
      <form className={classes.form}>
        <div className={classes.infoHeader}>
          <h1 className={classes.header}>Request information</h1>
          <p className={classes.contact}>020 3984 7581</p>
        </div>
        <div>
          <div className={classes.line}>
            <p>Hello, my name is</p>
            <InputFirstName />
          </div>
          <div className={classes.line}>
            <InputLastName />
            <p>and</p>
            <DropdownOptions />
            <p>{vehicle.year}</p>
          </div>
          <div className={classes.line}>
            <span>
              {vehicle.make} {vehicle.model}
            </span>
            <p>I&#39;m in the </p>
            <InputPostCode />
            <div>area. You can</div>
          </div>
          <div>reach me by email at</div>
          <div className={classes.line}>
            <InputEmail />
            <p>or by phone at </p>
          </div>
          <div className={classes.line}>
            <InputPhone />
            <p>. Thank you!</p>
          </div>
        </div>
        <div className={classes.options}>
          <p>I prefer: </p>
          <FormControlLabel control={<Checkbox />} label="Call" />
          <FormControlLabel control={<Checkbox />} label="Text" />
          <FormControlLabel control={<Checkbox />} label="Email" />
        </div>
        <ButtonPrimary
          imgSrc="/images/add.png"
          btnText="Add comments"
          className={classes.addComment}
        />
        <div>
          <FormControlLabel
            control={<Checkbox />}
            label="Email me new results for my search"
          />
        </div>
        <ThemeProvider value={BLUE_THEME}>
          <ButtonPrimary btnText="Send Message" className={classes.marginTop} />
        </ThemeProvider>
        <div className={classes.text}>
          By submitting my contact information on CarGurus, I agree to receive
          communications from CarGurus, from the vehicle&#39;s seller and from
          the seller&#39;s agent&#40;s&#41;. If I include my phone number, I
          agree to receive calls and text messages &#40;including via
          automation&#41;. I can opt out at any time. I also agree to the Terms
          of Use and Privacy Statement, which explain how my data is used to
          better understand my vehicle shopping interests.
        </div>
      </form>
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
                <CarImages />
                <CarImages />
                <CarImages />
                <CarImages />
                <CarImages />
                <CarImages />
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
      <Footer />
    </div>
  );
}
