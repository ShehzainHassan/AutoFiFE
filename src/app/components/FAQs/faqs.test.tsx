import { useSearch } from "@/contexts/car-search-context";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import { renderWithClient } from "@/test-utils/render-with-client";
import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react";
import FAQs from "./faqs";

jest.mock("@/hooks/useSearchVehicles");
jest.mock("@/contexts/car-search-context");

const mockedUseSearchVehicles = useSearchVehicles as jest.Mock;
const mockedUseSearch = useSearch as jest.Mock;

const mockSearchParams = {
  pageSize: 10,
  offset: 0,
  make: "Toyota",
  model: "Corolla",
  startPrice: 0,
  endPrice: 100000,
  status: "",
  mileage: 0,
  startYear: 2000,
  endYear: 2025,
  sortOrder: "asc",
  gearbox: "",
  selectedColor: "",
};

const mockVehicles = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    price: 15000,
    fuelType: "Petrol",
    year: 2020,
    mileage: 10000,
  },
  {
    id: 2,
    make: "Toyota",
    model: "Corolla",
    price: 17000,
    fuelType: "Diesel",
    year: 2021,
    mileage: 8000,
  },
];

describe("FAQs component", () => {
  beforeEach(() => {
    mockedUseSearch.mockReturnValue({
      mainSearch: { make: "Toyota", model: "Corolla" },
    });
  });

  it("shows loading spinner when loading", async () => {
    mockedUseSearchVehicles.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    await act(async () => {
      renderWithClient(<FAQs searchParams={mockSearchParams} />);
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error message on error", async () => {
    mockedUseSearchVehicles.mockReturnValue({
      isLoading: false,
      error: { message: "Something went wrong" },
      data: null,
    });

    await act(async () => {
      renderWithClient(<FAQs searchParams={mockSearchParams} />);
    });

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows empty state when no data", async () => {
    mockedUseSearchVehicles.mockReturnValue({
      isLoading: false,
      error: null,
      data: [],
    });

    await act(async () => {
      renderWithClient(<FAQs searchParams={mockSearchParams} />);
    });

    expect(screen.getByText(/no faqs found/i)).toBeInTheDocument();
  });

  it("renders FAQ content when data is available", async () => {
    mockedUseSearchVehicles.mockReturnValue({
      isLoading: false,
      error: null,
      data: mockVehicles,
    });

    await act(async () => {
      renderWithClient(<FAQs searchParams={mockSearchParams} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Toyota Corolla FAQs")).toBeInTheDocument();
      expect(
        screen.getByText(/how much does the toyota corolla cost/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/what fuel types are available/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/petrol, diesel are available/i)
      ).toBeInTheDocument();
    });
  });
});
