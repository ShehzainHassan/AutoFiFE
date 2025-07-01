import { fireEvent, render, screen } from "@testing-library/react";
import PriceExpandedContainer from "./price-expanded-container";

interface MockPriceExpandedProps {
  localRange: [number, number];
  handleChange: (event: unknown, value: [number, number]) => void;
  handleChangeCommitted: (event: unknown, value: [number, number]) => void;
  handleClear: () => void;
  getDisplayText: () => string;
}

jest.mock("./price-expanded.tsx", () => ({
  __esModule: true,
  default: ({
    localRange,
    handleChange,
    handleChangeCommitted,
    handleClear,
    getDisplayText,
  }: MockPriceExpandedProps) => (
    <div>
      <p data-testid="display-text">{getDisplayText()}</p>
      <button onClick={() => handleChange(null, [1000, 5000])}>Change</button>
      <button onClick={() => handleChangeCommitted(null, [1000, 5000])}>
        Commit
      </button>
      <button onClick={handleClear}>Clear</button>
      <p data-testid="range-values">
        {localRange[0]} - {localRange[1]}
      </p>
    </div>
  ),
}));

const mockSetMainSearch = jest.fn();
const mockSetStagedSearch = jest.fn();

jest.mock("@/contexts/car-search-context/car-search-context", () => ({
  useSearch: () => ({
    mainSearch: { startPrice: null, endPrice: null, price: "All_Prices" },
    setStagedSearch: mockSetStagedSearch,
    setMainSearch: mockSetMainSearch,
  }),
}));

describe("PriceExpandedContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays correct default text", () => {
    render(<PriceExpandedContainer />);
    expect(screen.getByTestId("display-text")).toHaveTextContent("All Prices");
  });

  it("handles slider change", () => {
    render(<PriceExpandedContainer />);
    fireEvent.click(screen.getByText("Change"));
    expect(screen.getByTestId("range-values")).toHaveTextContent("1000 - 5000");
  });

  it("commits slider change and updates context", () => {
    render(<PriceExpandedContainer />);
    fireEvent.click(screen.getByText("Commit"));

    expect(mockSetStagedSearch).toHaveBeenCalledWith(expect.any(Function));

    const setFn = mockSetStagedSearch.mock.calls[0][0];
    const result = setFn({});
    expect(result).toEqual({
      stagedStartPrice: 1000,
      stagedEndPrice: 5000,
    });

    expect(mockSetMainSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        price: "1000-5000",
      })
    );
  });

  it("clears the price filter", () => {
    render(<PriceExpandedContainer />);
    fireEvent.click(screen.getByText("Clear"));

    expect(mockSetStagedSearch).toHaveBeenCalledWith(expect.any(Function));
    const clearFn = mockSetStagedSearch.mock.calls[0][0];
    const result = clearFn({});
    expect(result).toEqual({
      stagedStartPrice: null,
      stagedEndPrice: null,
    });

    expect(mockSetMainSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        price: "All_Prices",
      })
    );
  });
});
