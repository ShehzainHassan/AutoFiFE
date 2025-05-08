import classes from "./sort-by.module.css";
export default function SortBy() {
  return (
    <div className={classes.sortBy}>
      <p>Sort by: </p>
      <select className={classes.select}>
        <option value="best deals">Best deals first</option>
      </select>
    </div>
  );
}
