import useSearchVehicles from "@/hooks/useSearchVehicles";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./pagination.module.css";
import { useSearch } from "@/contexts/carSearchContext";
import { PAGE_SIZE } from "@/constants";
export default function Pagination() {
  const { searchParams, setSearchParams } = useSearch();
  const { data } = useSearchVehicles(searchParams);
  const handleFirstPage = () => {
    setSearchParams({
      ...searchParams,
      offset: 0,
    });
  };

  const handleLastPage = () => {
    const totalPages = Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE);
    const lastOffset = (totalPages - 1) * PAGE_SIZE;

    setSearchParams({
      ...searchParams,
      offset: lastOffset,
    });
  };

  const handlePrev = () => {
    setSearchParams({
      ...searchParams,
      offset: searchParams.offset - PAGE_SIZE,
    });
  };

  const handleNext = () => {
    setSearchParams({
      ...searchParams,
      offset: searchParams.offset + PAGE_SIZE,
    });
  };

  const totalPages = Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE);
  const currentPage = Math.floor(searchParams.offset / PAGE_SIZE) + 1;
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  if (!data || data.totalCount === 0) return null;
  return (
    <div className={classes.pagination}>
      <div
        className={`${classes.buttonContainer} ${
          isPrevDisabled ? classes.buttonDisabled : ""
        }`}
        onClick={handleFirstPage}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div
        className={`${classes.buttonContainer} ${
          isPrevDisabled ? classes.buttonDisabled : ""
        }`}
        onClick={!isPrevDisabled ? handlePrev : undefined}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <div
        className={`${classes.buttonContainer} ${
          isNextDisabled ? classes.buttonDisabled : ""
        }`}
        onClick={!isNextDisabled ? handleNext : undefined}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <div
        className={`${classes.buttonContainer} ${
          isNextDisabled ? classes.buttonDisabled : ""
        }`}
        onClick={handleLastPage}>
        <FontAwesomeIcon icon={faChevronRight} />
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
}
