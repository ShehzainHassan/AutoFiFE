"use client";
import { MAX_YEAR, MIN_YEAR } from "@/constants/years";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { generateYearOptions } from "@/utilities/utilities";
import classes from "./years-expanded.module.css";
import { Dropdown } from "@/app/components/";

export default function YearsExpanded() {
  const { stagedSearch, setStagedSearch } = useSearch();
  const { stagedStartYear, stagedEndYear } = stagedSearch;

  const startYearOptions = generateYearOptions(
    MIN_YEAR,
    stagedEndYear ?? MAX_YEAR
  ).map((opt) => ({
    ...opt,
    value: opt.value.toString(),
  }));

  const endYearOptions = generateYearOptions(
    stagedStartYear ?? MIN_YEAR,
    MAX_YEAR
  ).map((opt) => ({
    ...opt,
    value: opt.value.toString(),
  }));

  const handleStartYearChange = (value: string) => {
    const newStart = Number(value);
    setStagedSearch((prev) => {
      const updated = { ...prev, stagedStartYear: newStart };
      if (prev.stagedEndYear !== null && newStart > prev.stagedEndYear) {
        updated.stagedEndYear = newStart;
      }
      return updated;
    });
  };

  const handleEndYearChange = (value: string) => {
    const newEnd = Number(value);
    setStagedSearch((prev) => {
      const updated = { ...prev, stagedEndYear: newEnd };
      if (prev.stagedStartYear !== null && newEnd < prev.stagedStartYear) {
        updated.stagedStartYear = newEnd;
      }
      return updated;
    });
  };

  return (
    <div className={classes.yearsContainer}>
      <Dropdown
        value={stagedStartYear?.toString()}
        onChange={handleStartYearChange}
        placeholder="Select start year">
        <Dropdown.Label>Min</Dropdown.Label>
        <Dropdown.Select options={startYearOptions} />
      </Dropdown>

      <Dropdown
        value={stagedEndYear?.toString()}
        onChange={handleEndYearChange}
        placeholder="Select end year">
        <Dropdown.Label>Max</Dropdown.Label>
        <Dropdown.Select options={endYearOptions} />
      </Dropdown>
    </div>
  );
}
