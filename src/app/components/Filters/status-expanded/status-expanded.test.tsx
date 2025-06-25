import { render, screen, fireEvent } from "@testing-library/react";
import StatusExpanded from "./status-expanded";
import { useSearch } from "@/contexts/car-search-context/car-search-context";

jest.mock("@/contexts/car-search-context/car-search-context", () => ({
  useSearch: jest.fn(),
}));

const mockSetStagedSearch = jest.fn();

beforeEach(() => {
  mockSetStagedSearch.mockClear();
});

describe("StatusExpanded", () => {
  const renderComponent = (stagedStatus: string) => {
    (useSearch as jest.Mock).mockReturnValue({
      stagedSearch: { stagedStatus },
      setStagedSearch: mockSetStagedSearch,
    });

    render(<StatusExpanded />);
  };

  it("renders all status options", () => {
    renderComponent("Any");

    expect(screen.getByLabelText("Any")).toBeInTheDocument();
    expect(screen.getByLabelText("New")).toBeInTheDocument();
    expect(screen.getByLabelText("Used")).toBeInTheDocument();
  });

  it("checks the correct checkbox based on stagedStatus", () => {
    renderComponent("Used");
    expect(screen.getByLabelText("Used")).toBeChecked();
    expect(screen.getByLabelText("Any")).not.toBeChecked();
    expect(screen.getByLabelText("New")).not.toBeChecked();
  });

  it("calls setStagedSearch with 'New' when New is clicked", () => {
    renderComponent("Any");
    fireEvent.click(screen.getByLabelText("New"));

    expect(mockSetStagedSearch).toHaveBeenCalledWith(expect.any(Function));

    const cb = mockSetStagedSearch.mock.calls[0][0];
    const result = cb({ stagedStatus: "Any" });

    expect(result).toEqual(expect.objectContaining({ stagedStatus: "New" }));
  });

  it("calls setStagedSearch with 'Used' when Used is clicked", () => {
    renderComponent("New");
    fireEvent.click(screen.getByLabelText("Used"));

    expect(mockSetStagedSearch).toHaveBeenCalledWith(expect.any(Function));

    const cb = mockSetStagedSearch.mock.calls[0][0];
    const result = cb({ stagedStatus: "New" });

    expect(result).toEqual(expect.objectContaining({ stagedStatus: "Used" }));
  });

  it("calls setStagedSearch with 'Any' when Any is clicked", () => {
    renderComponent("Used");
    fireEvent.click(screen.getByLabelText("Any"));

    expect(mockSetStagedSearch).toHaveBeenCalledWith(expect.any(Function));

    const stagedSearchUpdater = mockSetStagedSearch.mock.calls[0][0];
    const result = stagedSearchUpdater({ stagedStatus: "Used" });

    expect(result).toEqual(expect.objectContaining({ stagedStatus: "Any" }));
  });
});
