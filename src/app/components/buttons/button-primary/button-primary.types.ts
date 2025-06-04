export type ButtonPrimaryProps = {
  imgSrc?: string;
  btnText: string;
  backgroundColor?: string;
  borderRadius?: string;
  textColor?: string;
  padding?: string;
  hoverColor?: string;
  border?: string;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};
