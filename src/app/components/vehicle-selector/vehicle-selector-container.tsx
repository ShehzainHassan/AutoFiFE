"use client";

import useVehicleOptions from "@/hooks/useVehicleOptions";
import { useMemo } from "react";
import VehicleSelectorView from "./vehicle-selector-view";
import { VehicleSelectorProps } from "./vehicle-selector.types";

export default function VehicleSelectorContainer(props: VehicleSelectorProps) {
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
    if (!props.vehicle.make) return [{ label: "Choose a model", value: "" }];
    const models = vehicleData
      .filter((v) => v.make === props.vehicle.make)
      .map((v) => v.model);
    const uniqueModels = [...new Set(models)];
    return [
      { label: "Choose a model", value: "" },
      ...uniqueModels.map((model) => ({ label: model, value: model })),
    ];
  }, [vehicleData, props.vehicle.make]);

  const yearOptions = useMemo(() => {
    if (!props.vehicle.make || !props.vehicle.model)
      return [{ label: "Choose a year", value: "" }];
    const years = vehicleData
      .filter(
        (v) => v.make === props.vehicle.make && v.model === props.vehicle.model
      )
      .map((v) => v.year);
    const uniqueYears = [...new Set(years)].sort((a, b) => b - a);
    return [
      { label: "Choose a year", value: "" },
      ...uniqueYears.map((year) => ({
        label: year.toString(),
        value: year.toString(),
      })),
    ];
  }, [vehicleData, props.vehicle.make, props.vehicle.model]);

  const handleMakeChange = (value: string) => {
    props.onChange({ ...props.vehicle, make: value, model: "", year: "" });
  };

  const handleModelChange = (value: string) => {
    props.onChange({ ...props.vehicle, model: value, year: "" });
  };

  const handleYearChange = (value: string) => {
    props.onChange({ ...props.vehicle, year: value });
  };

  return (
    <VehicleSelectorView
      {...props}
      makeOptions={makeOptions}
      modelOptions={modelOptions}
      yearOptions={yearOptions}
      isLoading={isLoading}
      onMakeChange={handleMakeChange}
      onModelChange={handleModelChange}
      onYearChange={handleYearChange}
    />
  );
}
