import { render, screen, fireEvent } from "@testing-library/react";
import PopularMakes from "./popular-makes";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/car-search-context/car-search-context", () => ({
  useSearch: jest.fn(),
}));

jest.mock("../section-title/section-title", () => {
  interface SectionTitleProps {
    title: string;
    buttonText: string;
    onClick: () => void;
  }
  return {
    __esModule: true,
    default: ({ title, buttonText, onClick }: SectionTitleProps) => (
      <div>
        <h2>{title}</h2>
        <button onClick={onClick}>{buttonText}</button>
      </div>
    ),
  };
});

jest.mock("../horizontal-tabs/horizontal-tabs", () => {
  interface HorizontalTabsProps {
    tabs: string[];
    selectedTab: string;
    onTabChange: (tab: string) => void;
  }
  return {
    __esModule: true,
    default: ({ tabs, selectedTab, onTabChange }: HorizontalTabsProps) => (
      <div>
        {tabs.map((tab: string) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            data-testid={`tab-${tab}`}
            style={{ fontWeight: tab === selectedTab ? "bold" : "normal" }}>
            {tab}
          </button>
        ))}
      </div>
    ),
  };
});

jest.mock("../popular-makes-swiper/popular-makes-swiper", () => ({
  __esModule: true,
  default: ({ make }: { make: string }) => (
    <div>PopularMakesSwiper for {make}</div>
  ),
}));

describe("PopularMakes", () => {
  const mockPush = jest.fn();
  const mockSetSearchParams = jest.fn();
  const mockSetExpandedSections = jest.fn();
  const mockSetMainSearch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearch as jest.Mock).mockReturnValue({
      mainSearch: {
        mileage: 1234,
      },
      searchParams: {
        offset: 0,
      },
      setSearchParams: mockSetSearchParams,
      setExpandedSections: mockSetExpandedSections,
      setMainSearch: mockSetMainSearch,
    });
    jest.clearAllMocks();
  });

  it("renders tabs, title, and swiper", () => {
    render(<PopularMakes />);
    expect(screen.getByText("Popular Makes")).toBeInTheDocument();
    expect(screen.getByText("View All")).toBeInTheDocument();
    expect(screen.getByText("PopularMakesSwiper for Audi")).toBeInTheDocument(); // default
    expect(screen.getByTestId("tab-Audi")).toBeInTheDocument();
    expect(screen.getByTestId("tab-Ford")).toBeInTheDocument();
  });

  it("changes tab when clicked", () => {
    render(<PopularMakes />);
    fireEvent.click(screen.getByTestId("tab-Ford"));
    expect(screen.getByText("PopularMakesSwiper for Ford")).toBeInTheDocument();
  });

  it("handles 'View All' click and sets search params correctly", () => {
    render(<PopularMakes />);
    fireEvent.click(screen.getByText("View All"));
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining({
        make: "Audi",
        model: "Any_Models",
        offset: 0,
      })
    );
    expect(mockSetMainSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        make: "Audi",
        model: "Any_Models",
        selectedColors: [],
        selectedGearboxes: [],
      })
    );
    expect(mockSetExpandedSections).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/search?make=Audi&model=Any_Models");
  });
});
