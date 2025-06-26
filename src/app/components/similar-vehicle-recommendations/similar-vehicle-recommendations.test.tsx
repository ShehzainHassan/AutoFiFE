import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithClient } from "@/test-utils/render-with-client";
import useSimilarVehicles from "@/hooks/useSimilarVehicles";
import { useParams, useRouter } from "next/navigation";
import SimilarVehicleRecommendations from "./similar-vehicle-recommendations";

jest.mock("@/hooks/useSimilarVehicles", () => jest.fn());
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  (useParams as jest.Mock).mockReturnValue({ id: 1 });
  Storage.prototype.getItem = jest.fn(() => JSON.stringify({ token: "abc" }));
});

describe("VehicleRecommendations", () => {
  it("returns null if authData is missing", () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    (useSimilarVehicles as jest.Mock).mockReturnValue({
      data: null,
      isError: false,
      error: null,
      isLoading: false,
    });

    const { container } = renderWithClient(<SimilarVehicleRecommendations />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows loading spinner when loading", () => {
    (useSimilarVehicles as jest.Mock).mockReturnValue({
      data: null,
      isError: false,
      error: null,
      isLoading: true,
    });

    renderWithClient(<SimilarVehicleRecommendations />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error message if request fails", () => {
    (useSimilarVehicles as jest.Mock).mockReturnValue({
      data: null,
      isError: true,
      error: { message: "Failed to load" },
      isLoading: false,
    });

    renderWithClient(<SimilarVehicleRecommendations />);
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });

  it("returns null if no recommendations", () => {
    (useSimilarVehicles as jest.Mock).mockReturnValue({
      data: { similar_vehicles: [] },
      isError: false,
      error: null,
      isLoading: false,
    });

    const { container } = renderWithClient(<SimilarVehicleRecommendations />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders recommendations and navigates on card click", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (useSimilarVehicles as jest.Mock).mockReturnValue({
      data: {
        similar_vehicles: [
          {
            vehicle_id: 101,
            similarity_score: 0.871,
            features: {
              Make: "BMW",
              Model: "X5",
              Year: 2022,
              Price: "55000",
              Mileage: "22000",
            },
          },
        ],
      },
      isError: false,
      error: null,
      isLoading: false,
    });

    renderWithClient(<SimilarVehicleRecommendations />);

    expect(screen.getByText("Recommendations")).toBeInTheDocument();
    expect(screen.getByText(/2022 BMW X5/)).toBeInTheDocument();
    expect(screen.getByText(/55,000/)).toBeInTheDocument();
    expect(screen.getByText(/Mileage 22,000/)).toBeInTheDocument();

    const card = screen.getByText(/2022 BMW X5/).closest("div");
    fireEvent.click(card!);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/cars/101");
    });
  });
});
