import { render, screen, fireEvent } from "@testing-library/react";
import PremiumBrands from "./premium-brands";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { useRouter } from "next/navigation";
import useGetAllMakes from "@/hooks/useGetAllMakes";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/car-search-context/car-search-context", () => ({
  useSearch: jest.fn(),
}));

jest.mock("@/hooks/useGetAllMakes", () =>
  jest.fn(() => ({
    data: null,
    isLoading: true,
    refetch: jest.fn(),
  }))
);
interface SectionTitleProps {
  title: string;
  buttonText: string;
  onClick: () => void;
}

jest.mock("../section-title/section-title", () => ({
  __esModule: true,
  default: ({ title, buttonText, onClick }: SectionTitleProps) => (
    <div>
      <h2>{title}</h2>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  ),
}));

jest.mock("../brand-card/brand-card", () => ({
  __esModule: true,
  default: ({ brand, onClick }: { brand: string; onClick: () => void }) => (
    <div data-testid={`brand-card-${brand}`} onClick={onClick}>
      {brand}
    </div>
  ),
}));

describe("PremiumBrands", () => {
  const mockPush = jest.fn();
  const mockSetMainSearch = jest.fn();
  const mockSetStagedSearch = jest.fn();
  const mockSetSearchParams = jest.fn();
  const mockRefetch = jest.fn();

  const mockContextValue = {
    mainSearch: {},
    stagedSearch: {},
    searchParams: {},
    setMainSearch: mockSetMainSearch,
    setStagedSearch: mockSetStagedSearch,
    setSearchParams: mockSetSearchParams,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearch as jest.Mock).mockReturnValue(mockContextValue);
    (useGetAllMakes as jest.Mock).mockReturnValue({
      data: ["BMW", "Lexus"],
      isLoading: false,
      refetch: mockRefetch,
    });
    jest.clearAllMocks();
  });

  it("renders section title and brand cards", () => {
    render(<PremiumBrands />);
    expect(screen.getByText("Explore Our Premium Brands")).toBeInTheDocument();
    expect(screen.getByText("View All")).toBeInTheDocument();

    expect(screen.getByTestId("brand-card-BMW")).toBeInTheDocument();
  });

  it("toggles view all and shows extra brands", () => {
    (useGetAllMakes as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<PremiumBrands />);
    fireEvent.click(screen.getByText("View All"));

    expect(mockRefetch).toHaveBeenCalled();
    expect(screen.getByText("Hide All Brands")).toBeInTheDocument();
  });

  it("navigates to search on brand click", () => {
    render(<PremiumBrands />);
    const brandCard = screen.getByTestId("brand-card-BMW");
    fireEvent.click(brandCard);

    expect(mockSetMainSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        make: "BMW",
        model: "Any_Models",
      })
    );

    expect(mockSetStagedSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        stagedMake: "BMW",
        stagedModel: "Any_Models",
      })
    );

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining({
        make: "BMW",
        model: null,
      })
    );

    expect(mockPush).toHaveBeenCalledWith("/search?make=BMW");
  });
});
