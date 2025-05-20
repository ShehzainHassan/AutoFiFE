import { useSearch } from "@/contexts/carSearchContext";
import classes from "./sort-by.module.css";

export default function SortBy() {
  const { searchParams, setSearchParams } = useSearch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;

    let sortOrder: string | null = null;
    switch (selected) {
      case "price lowest":
        sortOrder = "price_asc";
        break;
      case "price highest":
        sortOrder = "price_desc";
        break;
      case "mileage lowest":
        sortOrder = "mileage_asc";
        break;
      case "mileage highest":
        sortOrder = "mileage_desc";
        break;
      case "name ascending":
        sortOrder = "name_asc";
        break;
      case "name descending":
        sortOrder = "name_desc";
        break;
      default:
        sortOrder = null;
    }
    setSearchParams({ ...searchParams, sortOrder });
  };

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
      </select>
    </div>
  );
}
