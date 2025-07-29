import { ButtonPrimary } from "@/app/components";
import { BUY_CARD, SELL_CARD } from "@/constants/button-primary-themes";
import headings from "@/styles/typography.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import Image from "next/image";
import classes from "./buy-sell-car.module.css";
import { CarCardProps } from "./buy-sell-car.types";
import ArrowWhiteIcon from "@/assets/images/icons/arrow-white.png";
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
      {type === "Buy" ? (
        <ThemeProvider value={BUY_CARD}>
          <ButtonPrimary
            btnText="Get started"
            imgPos="right"
            imgSrc={ArrowWhiteIcon}
          />
        </ThemeProvider>
      ) : (
        <ThemeProvider value={SELL_CARD}>
          <ButtonPrimary
            btnText="Get started"
            imgPos="right"
            imgSrc={ArrowWhiteIcon}
          />
        </ThemeProvider>
      )}

      <Image
        src={imgSrc}
        className={classes.image}
        alt="car"
        width={110}
        height={110}
        loading="lazy"
      />
    </div>
  );
}
