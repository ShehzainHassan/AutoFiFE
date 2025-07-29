import { useSearch } from "@/contexts/car-search-context/car-search-context";
import SortByView from "./sort-by-view";

export default function SortByContainer() {
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
      case "year ascending":
        sortOrder = "year_asc";
        break;
      case "year descending":
        sortOrder = "year_desc";
        break;

      default:
        sortOrder = null;
    }
    setSearchParams({ ...searchParams, sortOrder });
  };

  return <SortByView handleChange={handleChange} />;
}
