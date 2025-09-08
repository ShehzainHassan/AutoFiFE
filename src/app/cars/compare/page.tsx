"use client";
import {
  ButtonPrimary,
  CompareFeatures,
  VehicleSelector,
} from "@/app/components";
import NeedHelp from "@/app/components/box-assistant/need-help/need-help";
import Footer from "@/app/components/footer";
import { Navbar } from "@/app/components/navbar";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import { CompareVehicle } from "@/interfaces/vehicle";
import { ThemeProvider } from "@/theme/themeContext";
import { useState } from "react";
import classes from "./page.module.css";

export default function CompareVehiclesPage() {
  const [vehicles, setVehicles] = useState<CompareVehicle[]>([
    { show: false, make: "", model: "", year: "" },
    { show: false, make: "", model: "", year: "" },
  ]);
  const [compare, setCompare] = useState(false);

  const updateVehicle = (index: number, updated: CompareVehicle) => {
    setVehicles((prev) => {
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
    setCompare(false);
  };

  const removeVehicle = (index: number) => {
    setVehicles((prev) => {
      const copy = [...prev];
      copy[index] = { show: false, make: "", model: "", year: "" };
      return copy;
    });
    setCompare(false);
  };

  const allFilled = vehicles.every(
    (v) => v.show && v.make && v.model && v.year
  );

  return (
    <>
      <Navbar backgroundColor="var(--color-gray600)" />
      <div className={classes.container}>
        <div className={classes.vehicleContainer}>
          {vehicles.map((v, i) => (
            <VehicleSelector
              key={i}
              vehicle={v}
              onChange={(val) => updateVehicle(i, val)}
              onRemove={() => removeVehicle(i)}
            />
          ))}
        </div>
        <ThemeProvider value={BLUE_THEME}>
          <ButtonPrimary
            isDisabled={!allFilled}
            onClick={() => setCompare(true)}
            btnText="Compare"
          />
        </ThemeProvider>

        {compare && (
          <CompareFeatures vehicle1={vehicles[0]} vehicle2={vehicles[1]} />
        )}
      </div>
      <NeedHelp />
      <Footer />
    </>
  );
}
