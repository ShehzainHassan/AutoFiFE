import { screen, fireEvent } from "@testing-library/react";
import { renderWithClient } from "@/test-utils/render-with-client";
import AllVehiclesSwiper from ".";

jest.mock("@/hooks/useAllVehicles", () => jest.fn());

jest.mock(
  "@/app/components/vehicle-carousel/vertical-carousel/vertical-carousel",
  () => ({
    __esModule: true,
    default: ({
      vehicleListResult,
      onReachEnd,
    }: {
      vehicleListResult: { vehicles: { id: number; name: string }[] };
      onReachEnd: () => void;
    }) => (
      <div>
        <h2>Mock Carousel</h2>
        {vehicleListResult.vehicles.map((v: { id: number; name: string }) => (
          <div key={v.id} data-testid="vehicle-card">
            {v.name}
          </div>
        ))}
        <button onClick={onReachEnd}>Load More</button>
      </div>
    ),
  })
);

import useAllVehicles from "@/hooks/useAllVehicles";

describe("AllVehiclesSwiper", () => {
  const mockFetchNextPage = jest.fn();

  const mockPageData = {
    totalCount: 2,
    gearboxCounts: [],
    colorCounts: [],
    vehicles: [
      { id: 1, name: "Car A" },
      { id: 2, name: "Car B" },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading spinner when loading", () => {
    (useAllVehicles as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      error: null,
      data: null,
    });

    renderWithClient(<AllVehiclesSwiper vehicleStatus="NEW" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error message when there is an error", () => {
    (useAllVehicles as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: "Something went wrong" },
    });

    renderWithClient(<AllVehiclesSwiper vehicleStatus="USED" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows empty state when no data returned", () => {
    (useAllVehicles as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      data: null,
    });

    renderWithClient(<AllVehiclesSwiper vehicleStatus="USED" />);
    expect(screen.getByText("No vehicles found")).toBeInTheDocument();
  });

  it("renders carousel with vehicles when data is present", () => {
    (useAllVehicles as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage,
      data: {
        pages: [mockPageData],
      },
    });

    renderWithClient(<AllVehiclesSwiper vehicleStatus="USED" />);

    expect(screen.getByText("Mock Carousel")).toBeInTheDocument();
    expect(screen.getAllByTestId("vehicle-card")).toHaveLength(2);
    expect(screen.getByText("Car A")).toBeInTheDocument();
    expect(screen.getByText("Car B")).toBeInTheDocument();
  });

  it("calls fetchNextPage when reaching end and hasNextPage is true", () => {
    (useAllVehicles as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage,
      data: {
        pages: [mockPageData],
      },
    });

    renderWithClient(<AllVehiclesSwiper vehicleStatus="USED" />);

    fireEvent.click(screen.getByText("Load More"));
    expect(mockFetchNextPage).toHaveBeenCalled();
  });

  it("does not call fetchNextPage if hasNextPage is false", () => {
    (useAllVehicles as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage,
      data: {
        pages: [mockPageData],
      },
    });

    renderWithClient(<AllVehiclesSwiper vehicleStatus="USED" />);
    fireEvent.click(screen.getByText("Load More"));
    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });
});
