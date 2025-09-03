import { ReactNode } from "react";

export type MileageExpandedProps = {
  localMileage: number;
  getDisplayText(): ReactNode;
  handleChange(_: React.SyntheticEvent | Event, value: number | number[]): void;
  handleChangeCommitted(
    _: React.SyntheticEvent | Event,
    value: number | number[]
  ): void;
  handleClear(): void;
};
