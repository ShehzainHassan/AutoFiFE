import { StaticImageData } from "next/image";

export type ReportTypeProps = {
  imageSrc: string | StaticImageData;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};
