import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MileageExpanded from "./mileage-expanded";

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
    }: {
      value: number;
      onChange?: (event: object, value: number) => void;
      onChangeCommitted?: (event: object, value: number) => void;
      min?: number;
      max?: number;
      step?: number;
    }) => (
      <input
        data-testid="slider"
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange?.({}, Number(e.target.value))}
        onMouseUp={(e) =>
          onChangeCommitted?.({}, Number((e.target as HTMLInputElement).value))
        }
      />
    ),
  };
});

const mockSetStagedSearch = jest.fn();

jest.mock("@/contexts/car-search-context/car-search-context", () => ({
  useSearch: () => ({
    stagedSearch: {
      stagedMileage: null,
    },
    setStagedSearch: mockSetStagedSearch,
  }),
}));

describe("MileageExpanded", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default mileage text", () => {
    render(<MileageExpanded />);
    expect(screen.getByText("Any")).toBeInTheDocument();
  });

  it("updates local mileage on slider change", async () => {
    render(<MileageExpanded />);
    const slider = screen.getByTestId("slider");

    fireEvent.change(slider, { target: { value: "10000" } });

    await waitFor(() => {
      const textNode = screen.getByText("10,000 miles or fewer");
      expect(textNode).toBeInTheDocument();
    });
  });

  it("calls setStagedSearch with correct mileage on change committed", () => {
    render(<MileageExpanded />);
    const slider = screen.getByTestId("slider");

    fireEvent.mouseUp(slider, { target: { value: "10000" } });

    expect(mockSetStagedSearch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("clears the mileage when 'Clear' is clicked", () => {
    render(<MileageExpanded />);
    const clearBtn = screen.getByText("Clear");

    fireEvent.click(clearBtn);

    expect(mockSetStagedSearch).toHaveBeenCalledWith(expect.any(Function));
    expect(screen.getByText("Any")).toBeInTheDocument();
  });
});
