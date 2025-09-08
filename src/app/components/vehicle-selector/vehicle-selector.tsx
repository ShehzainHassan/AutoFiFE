"use client";

import { Dropdown, Loading } from "@/app/components/";
import useVehicleOptions from "@/hooks/useVehicleOptions";
import { Add, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMemo } from "react";
import styles from "./vehicle-selector.module.css";
import { VehicleSelectorProps } from "./vehicle-selector.types";

export default function VehicleSelectorContainer({
  vehicle,
  onRemove,
  onChange,
}: VehicleSelectorProps) {
  const { data, isLoading } = useVehicleOptions();

  const vehicleData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const makeOptions = useMemo(() => {
    const uniqueMakes = [...new Set(vehicleData.map((v) => v.make))];
    return [
      { label: "Choose a make", value: "" },
      ...uniqueMakes.map((make) => ({ label: make, value: make })),
    ];
  }, [vehicleData]);

  const modelOptions = useMemo(() => {
    if (!vehicle.make) return [{ label: "Choose a model", value: "" }];
    const models = vehicleData
      .filter((v) => v.make === vehicle.make)
      .map((v) => v.model);
    const uniqueModels = [...new Set(models)];
    return [
      { label: "Choose a model", value: "" },
      ...uniqueModels.map((model) => ({ label: model, value: model })),
    ];
  }, [vehicleData, vehicle.make]);

  const yearOptions = useMemo(() => {
    if (!vehicle.make || !vehicle.model)
      return [{ label: "Choose a year", value: "" }];
    const years = vehicleData
      .filter((v) => v.make === vehicle.make && v.model === vehicle.model)
      .map((v) => v.year);
    const uniqueYears = [...new Set(years)].sort((a, b) => b - a);
    return [
      { label: "Choose a year", value: "" },
      ...uniqueYears.map((year) => ({
        label: year.toString(),
        value: year.toString(),
      })),
    ];
  }, [vehicleData, vehicle.make, vehicle.model]);

  const handleMakeChange = (value: string) => {
    onChange({ ...vehicle, make: value, model: "", year: "" });
  };

  const handleModelChange = (value: string) => {
    onChange({ ...vehicle, model: value, year: "" });
  };

  const handleYearChange = (value: string) => {
    onChange({ ...vehicle, year: value });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.vehicleBox}>
        {vehicle.show ? (
          <>
            <div className={styles.header}>
              <h3 className={styles.subHeading}>Select a Vehicle</h3>
              <IconButton onClick={onRemove} size="small">
                <Close />
              </IconButton>
            </div>

            <div className={styles.dropdownContainer}>
              <Dropdown
                value={vehicle.make}
                onChange={handleMakeChange}
                placeholder="Choose a make">
                <Dropdown.Label>Make</Dropdown.Label>
                <Dropdown.Select options={makeOptions} />
              </Dropdown>

              <Dropdown
                value={vehicle.model}
                onChange={handleModelChange}
                placeholder="Choose a model">
                <Dropdown.Label>Model</Dropdown.Label>
                <Dropdown.Select options={modelOptions} />
              </Dropdown>

              <Dropdown
                value={vehicle.year}
                onChange={handleYearChange}
                placeholder="Choose a year">
                <Dropdown.Label>Year</Dropdown.Label>
                <Dropdown.Select options={yearOptions} />
              </Dropdown>
            </div>
          </>
        ) : isLoading ? (
          <div className={styles.loadingContainer}>
            <Loading />
          </div>
        ) : (
          <div
            className={styles.addIconContainer}
            onClick={() => onChange({ ...vehicle, show: true })}>
            <Add className={styles.addIcon} />
            <span>Add Vehicle</span>
          </div>
        )}
      </div>
    </div>
  );
}
