import Image from "next/image";
import classes from "./secondary.module.css";
import headings from "@/styles/typography.module.css";

type ButtonSecondaryProps = {
  btnText: string;
  buttonColor?: string;
};
export default function ButtonSecondary({
  btnText,
  buttonColor = "var(--color-blue500)",
}: ButtonSecondaryProps) {
  return (
    <div
      className={classes.btnContainer}
      style={{ backgroundColor: buttonColor }}>
      <button className={`${headings.modelText} ${classes.btn}`}>
        {btnText}
      </button>
      <Image src="/images/arrow-white.png" alt="arrow" width={14} height={14} />
    </div>
  );
}
