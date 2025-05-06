import headings from "@/styles/typography.module.css";
import classes from "./expandable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
type ExpandableProps = {
  title: string;
  roundedSides?: boolean;
};
export default function Expandable({
  title,
  roundedSides = false,
}: ExpandableProps) {
  return (
    <div
      className={classes.container}
      style={
        roundedSides
          ? {
              border: "1px solid var(--color-gray300)",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            }
          : {
              border: "1px solid var(--color-gray300)",
            }
      }>
      <p className={headings.filterText}>{title}</p>
      <div className={classes.icon}>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
    </div>
  );
}
