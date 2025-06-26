import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PriceExpanded from "./price-expanded";

// Mock the MUI Slider as a controlled range input
jest.mock("@mui/material", () => {
  const actual = jest.requireActual("@mui/material");
  return {
    ...actual,
    Slider: ({
      value,
      onChange,
      onChangeCommitted,
      min,
      max,
      step,
    }: React.ComponentPropsWithoutRef<typeof actual.Slider>) => (
      <input
        data-testid="slider"
        type="range"
        value={value[0]}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const newVal = Number(e.target.value);
          onChange?.({}, [newVal, value[1]]);
        }}
        onMouseUp={(e) => {
          const newVal = Number((e.target as HTMLInputElement).value);
          onChangeCommitted?.({}, [newVal, value[1]]);
        }}
      />
    ),
  };
});

const mockSetStagedSearch = jest.fn();
const mockSetMainSearch = jest.fn();

jest.mock("@/contexts/car-search-context/car-search-context", () => ({
  useSearch: () => ({
    mainSearch: {
      startPrice: null,
      endPrice: null,
      price: "All_Prices",
    },
    setStagedSearch: mockSetStagedSearch,
    setMainSearch: mockSetMainSearch,
  }),
}));

describe("PriceExpanded", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default price text", () => {
    render(<PriceExpanded />);
    expect(screen.getByText("All Prices")).toBeInTheDocument();
  });

  it("updates local price range on slider change", async () => {
    render(<PriceExpanded />);
    const slider = screen.getByTestId("slider");

    fireEvent.change(slider, { target: { value: "10000" } });

    await waitFor(() => {
      expect(screen.getByText("Greater than $10,000")).toBeInTheDocument();
    });
  });

  it("calls setStagedSearch and setMainSearch correctly on slider commit", () => {
    render(<PriceExpanded />);
    const slider = screen.getByTestId("slider");

    fireEvent.mouseUp(slider, { target: { value: "10000" } });

    expect(mockSetStagedSearch).toHaveBeenCalledTimes(1);
    expect(typeof mockSetStagedSearch.mock.calls[0][0]).toBe("function");

    expect(mockSetMainSearch).toHaveBeenCalledWith({
      startPrice: null,
      endPrice: null,
      price: ">10000",
    });
  });

  it("clears the price when Clear is clicked", () => {
    render(<PriceExpanded />);
    fireEvent.click(screen.getByText("Clear"));

    expect(mockSetStagedSearch).toHaveBeenCalledTimes(1);
    expect(typeof mockSetStagedSearch.mock.calls[0][0]).toBe("function");

    expect(mockSetMainSearch).toHaveBeenCalledWith({
      startPrice: null,
      endPrice: null,
      price: "All_Prices",
    });

    expect(screen.getByText("All Prices")).toBeInTheDocument();
  });
});
