"use client";
import {
  Borrow,
  ContactInfo,
  DOB,
  DrivingLicenseType,
  EmploymentStatus,
  GetFinanceQuote,
  Header,
  Loading,
  MaritalStatus,
} from "@/app/components";
import ErrorMessage from "@/app/components/error-message/error-message";
import Footer from "@/app/components/footer/footer";
import NavbarContainer from "@/app/components/navbar/navbar-container";
import useVehiclesById from "@/hooks/useVehicleById";
import { useParams } from "next/navigation";
import { useState } from "react";
import classes from "./page.module.css";
import { maritalStatusOptions } from "@/constants/marital-status-options";
import { employmentStatusOptions } from "@/constants/employment-status-options";
export default function FinancePage() {
  const params = useParams();
  const idParam = params.id;
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 7;

  const id = idParam ? Number(idParam) : -1;
  const {
    data: vehicle,
    isLoading,
    isError,
    error,
  } = useVehiclesById(id as number);

  if (isLoading) {
    return <Loading />;
  }
  if (!vehicle) return <div>Vehicle not found</div>;
  if (isError) {
    return <ErrorMessage message={error.message} />;
  }
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const ProgressBar = () => {
    return (
      <div className={classes.progressBarContainer}>
        <div
          className={classes.progressBar}
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}></div>
      </div>
    );
  };

  return (
    <div className={classes.mainContainer}>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <div className={classes.container}>
        <ProgressBar />
        {step > 1 && <Header vehicle={vehicle} prevStep={prevStep} />}
        {step === 1 && (
          <GetFinanceQuote vehicle={vehicle} nextStep={nextStep} />
        )}
        {step === 2 && <DrivingLicenseType nextStep={nextStep} />}
        {step === 3 && (
          <MaritalStatus options={maritalStatusOptions} nextStep={nextStep} />
        )}
        {step === 4 && <DOB nextStep={nextStep} />}
        {step === 5 && (
          <EmploymentStatus
            options={employmentStatusOptions}
            nextStep={nextStep}
          />
        )}
        {step === 6 && (
          <Borrow nextStep={nextStep} vehiclePrice={vehicle.price} />
        )}
        {step === 7 && <ContactInfo id={vehicle.id} />}
      </div>
      <Footer />
    </div>
  );
}
