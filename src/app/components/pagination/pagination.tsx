"use client";

import { PAGE_SIZE } from "@/constants";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./pagination.module.css";
import { PaginationProps } from "./pagination.types";

export default function Pagination({ totalCount }: PaginationProps) {
  const { searchParams, setSearchParams } = useSearch();

  const totalPages = Math.ceil((totalCount ?? 0) / PAGE_SIZE);
  const currentPage = Math.floor(searchParams.offset / PAGE_SIZE) + 1;
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  if (totalCount === 0) return null;

  const handleFirstPage = () => {
    if (!isPrevDisabled) {
      setSearchParams({ ...searchParams, offset: 0 });
    }
  };

  const handleLastPage = () => {
    if (!isNextDisabled) {
      const lastOffset = (totalPages - 1) * PAGE_SIZE;
      setSearchParams({ ...searchParams, offset: lastOffset });
    }
  };

  const handlePrev = () => {
    if (!isPrevDisabled) {
      setSearchParams({
        ...searchParams,
        offset: searchParams.offset - PAGE_SIZE,
      });
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setSearchParams({
        ...searchParams,
        offset: searchParams.offset + PAGE_SIZE,
      });
    }
  };

  return (
    <nav className={classes.pagination} aria-label="Pagination">
      <button
        className={classes.buttonContainer}
        onClick={handleFirstPage}
        disabled={isPrevDisabled}
        aria-label="Go to first page"
        aria-disabled={isPrevDisabled}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button
        className={classes.buttonContainer}
        onClick={handlePrev}
        disabled={isPrevDisabled}
        aria-label="Go to previous page"
        aria-disabled={isPrevDisabled}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div aria-current="page">
        Page {currentPage.toLocaleString()} of {totalPages.toLocaleString()}
      </div>

      <button
        className={classes.buttonContainer}
        onClick={handleNext}
        disabled={isNextDisabled}
        aria-label="Go to next page"
        aria-disabled={isNextDisabled}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      <button
        className={classes.buttonContainer}
        onClick={handleLastPage}
        disabled={isNextDisabled}
        aria-label="Go to last page"
        aria-disabled={isNextDisabled}>
        <FontAwesomeIcon icon={faChevronRight} />
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </nav>
  );
}
