import { ReactNode } from "react";

export interface TextContainerProps {
  label: string;
  value: string | number | ReactNode;
  change?: number;
  status?: string;
}
