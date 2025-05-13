import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./pagination.module.css";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
export default function Pagination() {
  return (
    <div className={classes.pagination}>
      <div className={classes.buttonContainer}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div className={classes.buttonContainer}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div>Page 1 of 1</div>
      <div className={classes.buttonContainer}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <div className={classes.buttonContainer}>
        <FontAwesomeIcon icon={faChevronRight} />
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
}
