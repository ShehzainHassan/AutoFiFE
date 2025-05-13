import headings from "@/styles/typography.module.css";
import ButtonSecondary from "../Buttons/Secondary";
import classes from "./buy-sell-car.module.css";
import Image from "next/image";
type CarCardProps = {
  title: string;
  description: string;
  backgroundColor?: string;
  imgSrc?: string;
  buttonColor?: string;
};
export default function BuySellCard({
  title,
  description,
  backgroundColor = "var(--color-blue100)",
  imgSrc = "/images/buy.png",
  buttonColor = "var(--color-blue500)",
}: CarCardProps) {
  return (
    <div className={classes.card} style={{ backgroundColor }}>
      <h1 className={`${headings.cardTitle} ${classes.title}`}>{title}</h1>
      <p className={`${headings.criteriaText} ${classes.description}`}>
        {description}
      </p>
      <ButtonSecondary btnText="Get Started" buttonColor={buttonColor} />
      <Image
        src={imgSrc}
        className={classes.image}
        alt="car"
        width={110}
        height={110}
      />
    </div>
  );
}
