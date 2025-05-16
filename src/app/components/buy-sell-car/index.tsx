import headings from "@/styles/typography.module.css";
import classes from "./buy-sell-car.module.css";
import Image from "next/image";
import ButtonSecondary from "../buttons/Secondary";
type CarCardProps = {
  title: string;
  description: string;
  imgSrc?: string;
  type?: "Buy" | "Sell";
};
export default function BuySellCard({
  title,
  description,
  imgSrc = "/images/buy.png",
  type,
}: CarCardProps) {
  return (
    <div
      className={classes.card}
      style={{
        backgroundColor:
          type === "Buy" ? "var(--color-blue100)" : "var(--color-pink100)",
      }}>
      <h1 className={`${headings.cardTitle} ${classes.title}`}>{title}</h1>
      <p className={`${headings.criteriaText} ${classes.description}`}>
        {description}
      </p>
      <ButtonSecondary
        btnText="Get Started"
        buttonColor={
          type === "Buy" ? "var(--color-blue500)" : "var(--color-black100)"
        }
      />
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
