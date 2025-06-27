import Image from "next/image";
import classes from "./button-navigate.module.css";
import { ButtonNavigateProps } from "./button-navigate.types";

export default function ButtonNavigate({
  type,
  width = 14,
  height = 14,
  onClick,
  backgroundColor = "var(--color-white100)",
  whiteButton = false,
  opacity = 1,
  className,
}: ButtonNavigateProps) {
  const imageSrc = whiteButton ? "/images/next-white.png" : "/images/next.png";

  const imageClassName = type === "prev" ? classes.prev : "";

  return (
    <div
      className={`${classes.container} ${className}`}
      onClick={onClick}
      style={{ backgroundColor, opacity }}>
      <Image
        src={imageSrc}
        alt={type}
        className={imageClassName}
        width={width}
        height={height}
        loading="lazy"
      />
    </div>
  );
}
