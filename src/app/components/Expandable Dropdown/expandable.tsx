import headings from "@/styles/typography.module.css";
import classes from "./expandable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
type ExpandableProps = {
  title: string;
  borderRadius?: string;
};
export default function Expandable({ title, borderRadius }: ExpandableProps) {
  return (
    <div className={classes.container} style={{ borderRadius }}>
      <p className={headings.filterText}>{title}</p>
      <div className={classes.icon}>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
    </div>
  );
}
