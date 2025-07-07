"use client";

import { Dropdown, Loading } from "@/app/components/";
import { Add, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import styles from "./vehicle-selector.module.css";
import { VehicleSelectorUIProps } from "./vehicle-selector.types";

export default function VehicleSelector({
  vehicle,
  onRemove,
  onChange,
  onMakeChange,
  onModelChange,
  onYearChange,
  makeOptions,
  modelOptions,
  yearOptions,
  isLoading,
}: VehicleSelectorUIProps) {
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
                onChange={onMakeChange}
                placeholder="Choose a make">
                <Dropdown.Label>Make</Dropdown.Label>
                <Dropdown.Select options={makeOptions} />
              </Dropdown>

              <Dropdown
                value={vehicle.model}
                onChange={onModelChange}
                placeholder="Choose a model">
                <Dropdown.Label>Model</Dropdown.Label>
                <Dropdown.Select options={modelOptions} />
              </Dropdown>

              <Dropdown
                value={vehicle.year}
                onChange={onYearChange}
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
