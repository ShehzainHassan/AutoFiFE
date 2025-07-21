import { ReactNode } from "react";

export type PriceExpandedProps = {
  localRange: [number, number];
  getDisplayText(): ReactNode;
  handleChange(_: React.SyntheticEvent | Event, value: number | number[]): void;
  handleChangeCommitted(
    _: React.SyntheticEvent | Event,
    value: number | number[]
  ): void;
  handleClear(): void;
};
