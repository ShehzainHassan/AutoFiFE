import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import Expandable from "./expandable-dropdown";

jest.mock("../filters/price-expanded/price-expanded", () => {
  const MockPriceExpanded = () => <div>PriceExpanded Component</div>;
  MockPriceExpanded.displayName = "MockPriceExpanded";
  return MockPriceExpanded;
});
jest.mock("../filters/status-expanded/status-expanded", () => {
  const MockStatusExpanded = () => <div>StatusExpanded Component</div>;
  MockStatusExpanded.displayName = "MockStatusExpanded";
  return MockStatusExpanded;
});
jest.mock("../filters/years-expanded/years-expanded", () => {
  const MockYearsExpanded = () => <div>YearsExpanded Component</div>;
  MockYearsExpanded.displayName = "MockYearsExpanded";
  return MockYearsExpanded;
});
jest.mock("../filters/gearbox-expanded/gearbox-expanded", () => {
  const MockGearboxExpanded = () => <div>GearboxExpanded Component</div>;
  MockGearboxExpanded.displayName = "MockGearboxExpanded";
  return MockGearboxExpanded;
});
jest.mock("../filters/colors-expanded/colors-expanded", () => {
  const MockColorsExpanded = () => <div>ColorsExpanded Component</div>;
  MockColorsExpanded.displayName = "MockColorsExpanded";
  return MockColorsExpanded;
});
jest.mock("../filters/mileage-expanded/mileage-expanded", () => {
  const MockMileageExpanded = () => <div>MileageExpanded Component</div>;
  MockMileageExpanded.displayName = "MockMileageExpanded";
  return MockMileageExpanded;
});

const setExpandedSectionsMock = jest.fn();

jest.mock("@/contexts/car-search-context/car-search-context", () => ({
  useSearch: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const setup = (title: string, isExpanded = false) => {
  const expandedSections = new Set<string>();
  if (isExpanded) expandedSections.add(title);

  (useSearch as jest.Mock).mockReturnValue({
    expandedSections,
    setExpandedSections: setExpandedSectionsMock,
  });

  render(<Expandable title={title} />);
};

describe("Expandable Component", () => {
  it("renders the title", () => {
    setup("Price");
    expect(screen.getByText("Price")).toBeInTheDocument();
  });

  it("toggles expansion on click and renders PriceExpanded", () => {
    setup("Price");

    fireEvent.click(screen.getByText("Price"));
    expect(setExpandedSectionsMock).toHaveBeenCalled();

    setup("Price", true);
    expect(screen.getByText("PriceExpanded Component")).toBeInTheDocument();
  });

  it("renders correct expanded component based on title", () => {
    setup("Status", true);
    expect(screen.getByText("StatusExpanded Component")).toBeInTheDocument();

    setup("Years", true);
    expect(screen.getByText("YearsExpanded Component")).toBeInTheDocument();

    setup("Gearbox", true);
    expect(screen.getByText("GearboxExpanded Component")).toBeInTheDocument();

    setup("Exterior color", true);
    expect(screen.getByText("ColorsExpanded Component")).toBeInTheDocument();

    setup("Mileage", true);
    expect(screen.getByText("MileageExpanded Component")).toBeInTheDocument();
  });

  it("does not render any expanded content if not clicked", () => {
    setup("Price", false);
    expect(
      screen.queryByText("PriceExpanded Component")
    ).not.toBeInTheDocument();
  });
});
