import Image from "next/image";
import classes from "./auth-button.module.css";
type AuthButtonProps = {
  btnText: string;
};

export default function AuthButton({ btnText }: AuthButtonProps) {
  return (
    <div className={classes.button}>
      <div>{btnText}</div>
      <Image
        src="/images/arrow-white.png"
        alt="arrow"
        width={20}
        height={20}
        style={{ rotate: "45deg" }}
      />
    </div>
  );
}
