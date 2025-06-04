"use client";
import { MAX_YEAR, MIN_YEAR } from "@/constants/years";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { generateYearOptions } from "@/utilities/utilities";
import classes from "./years-expanded.module.css";
import { Dropdown } from "../../dropdown";

export default function YearsExpanded() {
  const { startYear, endYear, setStartYear, setEndYear } = useSearch();

  const startYearOptions = generateYearOptions(
    MIN_YEAR,
    endYear ?? MAX_YEAR
  ).map((opt) => ({
    ...opt,
    value: opt.value.toString(),
  }));

  const endYearOptions = generateYearOptions(
    startYear ?? MIN_YEAR,
    MAX_YEAR
  ).map((opt) => ({
    ...opt,
    value: opt.value.toString(),
  }));

  return (
    <div className={classes.yearsContainer}>
      <Dropdown
        value={startYear?.toString()}
        onChange={(value) => {
          const newStart = Number(value);
          setStartYear(newStart);

          if (endYear !== null && newStart > endYear) {
            setEndYear(newStart);
          }
        }}
        placeholder="Select start year">
        <Dropdown.Label>Min</Dropdown.Label>
        <Dropdown.Select options={startYearOptions} />
      </Dropdown>

      <Dropdown
        value={endYear?.toString()}
        onChange={(value) => {
          const newEnd = Number(value);
          setEndYear(newEnd);
          if (startYear !== null && newEnd < startYear) {
            setStartYear(newEnd);
          }
        }}
        placeholder="Select end year">
        <Dropdown.Label>Max</Dropdown.Label>
        <Dropdown.Select options={endYearOptions} />
      </Dropdown>
    </div>
  );
}
