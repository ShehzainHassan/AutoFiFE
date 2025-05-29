import { useSearch } from "@/contexts/carSearchContext";
import headings from "@/styles/typography.module.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColorsExpanded from "../filters/colors-expanded";
import GearboxExpanded from "../filters/gearbox-expanded";
import MileageExpanded from "../filters/mileage-expanded";
import PriceExpanded from "../filters/price-expanded";
import YearsExpanded from "../filters/years-expanded";
import classes from "./expandable.module.css";
type ExpandableProps = {
  title: string;
  className?: string;
};
export default function Expandable({ title, className }: ExpandableProps) {
  const { expandedSections, setExpandedSections } = useSearch();
  const isClicked = expandedSections.has(title);

  const toggleExpanded = () => {
    const newSet = new Set(expandedSections);
    if (newSet.has(title)) {
      newSet.delete(title);
    } else {
      newSet.add(title);
    }
    setExpandedSections(newSet);
  };
  return (
    <div className={`${classes.mainContainer} ${className}`}>
      <div className={classes.container} onClick={toggleExpanded}>
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
      {isClicked && title === "Years" && <YearsExpanded />}
      {isClicked && title === "Gearbox" && <GearboxExpanded />}
      {isClicked && title === "Exterior color" && <ColorsExpanded />}
    </div>
  );
}
