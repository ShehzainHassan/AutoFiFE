import { useCallback } from "react";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import classes from "./sort-by.module.css";

const SORT_OPTIONS: Record<string, string> = {
  "price lowest": "price_asc",
  "price highest": "price_desc",
  "mileage lowest": "mileage_asc",
  "mileage highest": "mileage_desc",
  "name ascending": "name_asc",
  "name descending": "name_desc",
  "year ascending": "year_asc",
  "year descending": "year_desc",
};

export default function SortBy() {
  const { searchParams, setSearchParams } = useSearch();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = e.target.value;
      const sortOrder = SORT_OPTIONS[selected] ?? null;
      setSearchParams({ ...searchParams, sortOrder });
    },
    [searchParams, setSearchParams]
  );

  return (
    <div className={classes.sortBy}>
      <label htmlFor="sort-select" className={classes.label}>
        Sort by:
      </label>
      <select
        id="sort-select"
        className={classes.select}
        onChange={handleChange}
        defaultValue=""
        aria-label="Sort vehicles by criteria">
        <option value="">Best deals first</option>
        {Object.keys(SORT_OPTIONS).map((label) => (
          <option key={label} value={label}>
            {label
              .replace("lowest", "(Low to High)")
              .replace("highest", "(High to Low)")
              .replace("ascending", "(A to Z)")
              .replace("descending", "(Z to A)")
              .replace("year", "Year")}
          </option>
        ))}
      </select>
    </div>
  );
}
