import { render, screen, fireEvent } from "@testing-library/react";
import SortByContainer from "./sort-by";

const mockSetSearchParams = jest.fn();

jest.mock("@/contexts/car-search-context/car-search-context", () => ({
  useSearch: () => ({
    searchParams: { make: "Toyota", model: "Corolla" },
    setSearchParams: mockSetSearchParams,
  }),
}));

jest.mock("./sort-by", () => {
  type SortByProps = {
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  };
  const MockSortBy = ({ handleChange }: SortByProps) => (
    <select data-testid="sort-select" onChange={handleChange}>
      <option value="price lowest">Price Lowest</option>
      <option value="price highest">Price Highest</option>
      <option value="mileage lowest">Mileage Lowest</option>
      <option value="mileage highest">Mileage Highest</option>
      <option value="name ascending">Name Ascending</option>
      <option value="name descending">Name Descending</option>
      <option value="year ascending">Year Ascending</option>
      <option value="year descending">Year Descending</option>
    </select>
  );
  MockSortBy.displayName = "MockSortBy";
  return MockSortBy;
});

describe("SortByContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    ["price lowest", "price_asc"],
    ["price highest", "price_desc"],
    ["mileage lowest", "mileage_asc"],
    ["mileage highest", "mileage_desc"],
    ["name ascending", "name_asc"],
    ["name descending", "name_desc"],
    ["year ascending", "year_asc"],
    ["year descending", "year_desc"],
    ["unknown value", null], // edge case
  ];

  test.each(testCases)(
    "sets correct sortOrder when '%s' is selected",
    (optionValue, expectedSortOrder) => {
      render(<SortByContainer />);
      const select = screen.getByTestId("sort-select");

      fireEvent.change(select, { target: { value: optionValue } });

      expect(mockSetSearchParams).toHaveBeenCalledWith({
        make: "Toyota",
        model: "Corolla",
        sortOrder: expectedSortOrder,
      });
    }
  );
});
