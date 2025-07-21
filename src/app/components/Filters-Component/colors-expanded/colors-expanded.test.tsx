import { render, screen, fireEvent } from "@testing-library/react";
import ColorsExpanded from "./colors-expanded";
import { useSearch } from "@/contexts/car-search-context/car-search-context";

jest.mock("@/contexts/car-search-context/car-search-context");

const mockSetStagedSearch = jest.fn();

const mockedUseSearch = useSearch as jest.Mock;

const mockContext = {
  stagedSearch: {
    stagedColors: ["Red"],
  },
  setStagedSearch: mockSetStagedSearch,
  allColors: ["Red", "Blue", "Green", "Silver"],
  counts: {
    colorsCount: {
      Red: 5,
      Blue: 0,
      Green: 3,
      Silver: 1,
    },
  },
};

describe("ColorsExpanded", () => {
  beforeEach(() => {
    mockedUseSearch.mockReturnValue(mockContext);
    mockSetStagedSearch.mockClear();
  });

  it("renders all color options with correct labels and counts", () => {
    render(<ColorsExpanded />);
    expect(screen.getByText("Red (5)")).toBeInTheDocument();
    expect(screen.getByText("Blue (0)")).toBeInTheDocument();
    expect(screen.getByText("Green (3)")).toBeInTheDocument();
    expect(screen.getByText("Silver (1)")).toBeInTheDocument();
  });

  it("disables checkboxes with 0 count", () => {
    render(<ColorsExpanded />);
    const blueCheckbox = screen.getByLabelText("Blue (0)") as HTMLInputElement;
    expect(blueCheckbox.disabled).toBe(true);
  });

  it("checks the checkbox for selected color", () => {
    render(<ColorsExpanded />);
    const redCheckbox = screen.getByLabelText("Red (5)") as HTMLInputElement;
    expect(redCheckbox.checked).toBe(true);
  });

  it("calls setStagedSearch when a checkbox is toggled on", () => {
    render(<ColorsExpanded />);
    const greenCheckbox = screen.getByLabelText(
      "Green (3)"
    ) as HTMLInputElement;
    fireEvent.click(greenCheckbox);
    expect(mockSetStagedSearch).toHaveBeenCalled();
  });

  it("calls setStagedSearch when a checkbox is toggled off", () => {
    render(<ColorsExpanded />);
    const redCheckbox = screen.getByLabelText("Red (5)") as HTMLInputElement;
    fireEvent.click(redCheckbox);
    expect(mockSetStagedSearch).toHaveBeenCalled();
  });
});
