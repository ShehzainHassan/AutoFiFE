import { StaticImageData } from "next/image";

export type ButtonPrimaryProps = {
  imgSrc?: string | StaticImageData;
  btnText: string | React.ReactNode;
  backgroundColor?: string;
  borderRadius?: string;
  textColor?: string;
  padding?: string;
  hoverColor?: string;
  hoverTextColor?: string;
  border?: string;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  width?: string;
  imgPos?: "left" | "right";
};
