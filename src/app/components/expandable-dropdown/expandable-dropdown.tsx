"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import headings from "@/styles/typography.module.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColorsExpanded from "../filters/colors-expanded/colors-expanded";
import GearboxExpanded from "../filters/gearbox-expanded/gearbox-expanded";
import MileageExpandedContainer from "../filters/mileage-expanded/mileage-expanded-container";
import PriceExpandedContainer from "../filters/price-expanded/price-expanded-container";
import StatusExpanded from "../filters/status-expanded/status-expanded";
import YearsExpanded from "../filters/years-expanded/years-expanded";
import { ExpandableProps } from "./expandable-dropdown.types";
import classes from "./expandable.module.css";

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
      {isClicked && title === "Price" && <PriceExpandedContainer />}
      {isClicked && title === "Mileage" && <MileageExpandedContainer />}
      {isClicked && title === "Status" && <StatusExpanded />}
      {isClicked && title === "Years" && <YearsExpanded />}
      {isClicked && title === "Gearbox" && <GearboxExpanded />}
      {isClicked && title === "Exterior color" && <ColorsExpanded />}
    </div>
  );
}
