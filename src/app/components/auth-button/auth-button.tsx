import Image from "next/image";
import classes from "./auth-button.module.css";
import { AuthButtonProps } from "./auth-button.types";
import arrowWhiteIcon from "@/assets/images/icons/arrow-white.png";
export default function AuthButton({
  btnText,
  onClick,
  disabled = false,
}: AuthButtonProps) {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };
  return (
    <div
      className={`${classes.button} ${disabled ? classes.disabled : ""}`}
      onClick={handleClick}>
      <div>{btnText}</div>
      <Image
        src={arrowWhiteIcon}
        alt="arrow"
        width={20}
        height={20}
        loading="lazy"
        placeholder="blur"
        style={{ rotate: "45deg" }}
      />
    </div>
  );
}
