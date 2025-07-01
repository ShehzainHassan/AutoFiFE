import classes from "./sort-by.module.css";
import { SortByProps } from "./sort-by.types";

export default function SortBy({ handleChange }: SortByProps) {
  return (
    <div className={classes.sortBy}>
      <p>Sort by: </p>
      <select
        className={classes.select}
        onChange={handleChange}
        defaultValue="">
        <option value="">Best deals first</option>
        <option value="price lowest">Price (Low to High)</option>
        <option value="price highest">Price (High to Low)</option>
        <option value="mileage lowest">Mileage (Low to High)</option>
        <option value="mileage highest">Mileage (High to Low)</option>
        <option value="name ascending">Name (A to Z)</option>
        <option value="name descending">Name (Z to A)</option>
        <option value="year ascending">Year (Old to High)</option>
        <option value="year descending">Year (New to Low)</option>
      </select>
    </div>
  );
}
