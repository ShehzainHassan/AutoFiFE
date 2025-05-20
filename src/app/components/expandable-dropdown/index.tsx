import headings from "@/styles/typography.module.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./expandable.module.css";
import { useState } from "react";
import PriceExpanded from "../filters/price-expanded";
import MileageExpanded from "../filters/mileage-expanded";
type ExpandableProps = {
  title: string;
  roundedSides?: boolean;
};
export default function Expandable({
  title,
  roundedSides = false,
}: ExpandableProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.container}
        onClick={() => setIsClicked(!isClicked)}
        style={
          roundedSides
            ? {
                border: "1px solid var(--color-gray300)",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              }
            : {
                border: "1px solid var(--color-gray300)",
                borderBottom: "none",
              }
        }>
        <p className={headings.filterText}>{title}</p>
        <div className={classes.icon}>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`${classes.icon} ${isClicked ? classes.rotate : ""}`}
          />
        </div>
      </div>
      {isClicked && title === "Price" && <PriceExpanded />}
      {isClicked && title === "Mileage" && <MileageExpanded />}
    </div>
  );
}
