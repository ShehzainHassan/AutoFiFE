import { render, screen, fireEvent } from "@testing-library/react";
import GearboxExpanded from "./gearbox-expanded";
import { useSearch } from "@/contexts/car-search-context/car-search-context";

jest.mock("@/contexts/car-search-context/car-search-context");

const mockSetStagedSearch = jest.fn();

const mockedUseSearch = useSearch as jest.Mock;

const mockContext = {
  stagedSearch: {
    stagedGearboxes: ["Automatic"],
  },
  setStagedSearch: mockSetStagedSearch,
  counts: {
    gearboxesCount: {
      Automatic: 10,
      Manual: 0,
      CVT: 3,
    },
  },
};

describe("GearboxExpanded", () => {
  beforeEach(() => {
    mockedUseSearch.mockReturnValue(mockContext);
    mockSetStagedSearch.mockClear();
  });

  it("renders all gearbox options with counts", () => {
    render(<GearboxExpanded />);
    expect(screen.getByLabelText("Automatic (10)")).toBeInTheDocument();
    expect(screen.getByLabelText("CVT (3)")).toBeInTheDocument();
    expect(screen.getByLabelText("Manual (0)")).toBeInTheDocument();
  });

  it("disables checkboxes with 0 count", () => {
    render(<GearboxExpanded />);
    const manualCheckbox = screen.getByLabelText(
      "Manual (0)"
    ) as HTMLInputElement;
    expect(manualCheckbox.disabled).toBe(true);
  });

  it("checks the checkbox if gearbox is selected", () => {
    render(<GearboxExpanded />);
    const automaticCheckbox = screen.getByLabelText(
      "Automatic (10)"
    ) as HTMLInputElement;
    expect(automaticCheckbox.checked).toBe(true);
  });

  it("calls setStagedSearch when a checkbox is toggled on", () => {
    render(<GearboxExpanded />);
    const cvtCheckbox = screen.getByLabelText("CVT (3)") as HTMLInputElement;
    fireEvent.click(cvtCheckbox);
    expect(mockSetStagedSearch).toHaveBeenCalled();
  });

  it("calls setStagedSearch when a checkbox is toggled off", () => {
    render(<GearboxExpanded />);
    const automaticCheckbox = screen.getByLabelText(
      "Automatic (10)"
    ) as HTMLInputElement;
    fireEvent.click(automaticCheckbox);
    expect(mockSetStagedSearch).toHaveBeenCalled();
  });
});
