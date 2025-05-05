import Image from "next/image";
import classes from "./navigate.module.css";

type ButtonNavigateProps = {
  type: "next" | "prev";
  width?: number;
  height?: number;
  onClick?: () => void;
  backgroundColor?: string;
  whiteButton?: boolean;
};

export default function ButtonNavigate({
  type,
  width = 14,
  height = 14,
  onClick,
  backgroundColor = "var(--color-white100)",
  whiteButton = false,
}: ButtonNavigateProps) {
  const imageSrc =
    whiteButton && type === "prev"
      ? "/images/next-white.png"
      : whiteButton && type === "next"
      ? "/images/next-white.png"
      : "/images/next.png";

  const imageClassName = type === "prev" ? classes.prev : "";

  return (
    <div
      className={classes.container}
      onClick={onClick}
      style={{ backgroundColor }}>
      <Image
        src={imageSrc}
        alt={type}
        className={imageClassName}
        width={width}
        height={height}
      />
    </div>
  );
}
