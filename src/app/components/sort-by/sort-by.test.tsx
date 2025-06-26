import { render, screen, fireEvent } from "@testing-library/react";
import SortBy from "./sort-by";
import { useSearch } from "@/contexts/car-search-context/car-search-context";

jest.mock("@/contexts/car-search-context/car-search-context");

const mockSetSearchParams = jest.fn();
const mockSearchParams = {};

const mockedUseSearch = useSearch as jest.Mock;

beforeEach(() => {
  mockedUseSearch.mockReturnValue({
    searchParams: mockSearchParams,
    setSearchParams: mockSetSearchParams,
  });
  mockSetSearchParams.mockClear();
});

describe("SortBy Component", () => {
  it("renders the select with correct default option", () => {
    render(<SortBy />);
    expect(screen.getByText("Best deals first")).toBeInTheDocument();
  });

  it("calls setSearchParams with correct sortOrder on selection", () => {
    render(<SortBy />);
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "price highest" } });

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      ...mockSearchParams,
      sortOrder: "price_desc",
    });
  });

  it("sets sortOrder to null if default is selected again", () => {
    render(<SortBy />);
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "" } });

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      ...mockSearchParams,
      sortOrder: null,
    });
  });
});
