"use client";

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
  const theme = type === "Buy" ? BUY_CARD : SELL_CARD;

  return (
    <section
      className={classes.card}
      role="region"
      aria-label={`${type} car card`}
      style={{
        backgroundColor:
          type === "Buy" ? "var(--color-blue100)" : "var(--color-pink100)",
      }}>
      <h1 className={`${headings.cardTitle} ${classes.title}`}>{title}</h1>
      <p className={`${headings.criteriaText} ${classes.description}`}>
        {description}
      </p>

      <ThemeProvider value={theme}>
        <ButtonPrimary
          btnText="Get started"
          imgPos="right"
          imgSrc={ArrowWhiteIcon}
          className={classes.buttonPrimary}
        />
      </ThemeProvider>

      <Image
        src={imgSrc}
        className={classes.image}
        alt={`${type} car illustration`}
        width={110}
        height={110}
        loading="lazy"
      />
    </section>
  );
}
