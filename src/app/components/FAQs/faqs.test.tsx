import { useSearch } from "@/contexts/car-search-context";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import { screen } from "@testing-library/react";
import FAQs from "../faqs";
import { renderWithClient } from "@/test-utils/render-with-client";

jest.mock("@/contexts/car-search-context", () => ({
  useSearch: jest.fn(),
}));

jest.mock("@/hooks/useSearchVehicles", () => jest.fn());

jest.mock("@/utilities/utilities", () => ({
  getAveragePrice: jest.fn(() => "$22,000"),
  getFAQTitle: jest.fn(() => "Toyota Corolla"),
  getRange: jest.fn(() => ({ min: 15000, max: 29000 })),
  getUniqueFuelTypes: jest.fn(() => ["Petrol", "Hybrid"]),
  getVehicleText: jest.fn(() => "Toyota Corolla"),
}));

describe("FAQs Component", () => {
  const searchParams = {
    pageSize: 10,
    offset: 0,
    make: "Toyota",
    model: "Corolla",
    startPrice: 15000,
    endPrice: 29000,
    status: "NEW",
    mileage: 10000,
    startYear: 2022,
    endYear: 2023,
    sortOrder: "year_asc",
    selectedColor: "White",
    gearbox: "Automatic",
  };

  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue({
      mainSearch: { make: "Toyota", model: "Corolla" },
    });
  });

  it("renders loading state", () => {
    (useSearchVehicles as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    renderWithClient(<FAQs searchParams={searchParams} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useSearchVehicles as jest.Mock).mockReturnValue({
      isLoading: false,
      error: { message: "Something went wrong" },
      data: null,
    });

    renderWithClient(<FAQs searchParams={searchParams} />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("renders empty state when no data", () => {
    (useSearchVehicles as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: [],
    });

    renderWithClient(<FAQs searchParams={searchParams} />);
    expect(screen.getByText("No FAQs found")).toBeInTheDocument();
  });

  it("renders FAQs with multiple data items", () => {
    const mockData = [
      { id: 1, fuelType: "Petrol", price: 20000 },
      { id: 2, fuelType: "Hybrid", price: 22000 },
    ];

    (useSearchVehicles as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockData,
    });

    renderWithClient(<FAQs searchParams={searchParams} />);

    expect(screen.getByText(/Toyota Corolla FAQs/i)).toBeInTheDocument();
    expect(
      screen.getByText(/how much does the Toyota Corolla cost/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The average Toyota Corolla costs about \$22,000/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /16 out of 16 for sale have no reported accidents or damage/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Petrol, Hybrid are available/i)
    ).toBeInTheDocument();
  });

  it("renders 'is available' for single item", () => {
    const mockData = [{ id: 1, fuelType: "Hybrid", price: 21000 }];

    (useSearchVehicles as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockData,
    });

    renderWithClient(<FAQs searchParams={searchParams} />);

    expect(
      screen.getByText(/Petrol, Hybrid is available/i)
    ).toBeInTheDocument();
  });
});
