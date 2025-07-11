import { MouseEventHandler, ReactNode } from "react";

export type TextContainerProps = {
  value: string | number | ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  padding?: string;
  width?: string;
  borderRadius?: string;
  fontWeight?: number | string;
  fontSize?: string;
};
