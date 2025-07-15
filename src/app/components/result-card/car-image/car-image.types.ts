import { StaticImageData } from "next/image";

export type CarImageProps = {
  src?: string | StaticImageData;
  width?: number;
  height?: number;
  children?: React.ReactNode;
  className?: string;
  onClick?(): void;
};
