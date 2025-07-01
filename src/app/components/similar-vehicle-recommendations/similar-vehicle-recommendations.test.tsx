import useSimilarVehicles from "@/hooks/useSimilarVehicles";
import { render, screen } from "@testing-library/react";
import { useParams, useRouter } from "next/navigation";
import SimilarVehicleRecommendationsContainer from "./similar-vehicle-recommendations-container";

jest.mock("@/hooks/useSimilarVehicles");
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock("@mui/material", () => ({
  CircularProgress: () => <div data-testid="spinner" />,
}));

jest.mock("../error-message/error-message", () => ({
  __esModule: true,
  default: ({ message }: { message: string }) => (
    <div data-testid="error-message">{message}</div>
  ),
}));

const mockRecommendations = jest.fn();
jest.mock("./similar-vehicle-recommendations", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    mockRecommendations(props);
    return <div data-testid="recommendations">Recommendations</div>;
  },
}));

describe("SimilarVehicleRecommendationsContainer", () => {
  const mockUseSimilarVehicles = useSimilarVehicles as jest.Mock;
  const mockUseParams = useParams as jest.Mock;
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseParams.mockReturnValue({ id: "42" });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });
  it("returns null if no authData", () => {
    Storage.prototype.getItem = jest.fn(() => null);

    mockUseSimilarVehicles.mockReturnValue({
      data: null,
      isError: false,
      isLoading: false,
      error: null,
    });

    const { container } = render(<SimilarVehicleRecommendationsContainer />);
    expect(container.firstChild).toBeNull();
  });

  it("shows loading spinner while data is loading", () => {
    Storage.prototype.getItem = jest.fn(() => "auth");
    mockUseSimilarVehicles.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(<SimilarVehicleRecommendationsContainer />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("shows error message when error occurs", () => {
    Storage.prototype.getItem = jest.fn(() => "auth");
    mockUseSimilarVehicles.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: "Something went wrong" },
    });

    render(<SimilarVehicleRecommendationsContainer />);
    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Something went wrong"
    );
  });

  it("returns null if similarVehicles list is empty", () => {
    Storage.prototype.getItem = jest.fn(() => "auth");
    mockUseSimilarVehicles.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { similar_vehicles: [] },
    });

    const { container } = render(<SimilarVehicleRecommendationsContainer />);
    expect(container.firstChild).toBeNull();
  });

  it("renders SimilarVehicleRecommendations with correct props", () => {
    Storage.prototype.getItem = jest.fn(() => "auth");
    mockUseSimilarVehicles.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        similar_vehicles: [{ id: 1, vin: "XYZ" }],
      },
    });

    render(<SimilarVehicleRecommendationsContainer />);

    expect(screen.getByTestId("recommendations")).toBeInTheDocument();
    expect(mockRecommendations).toHaveBeenCalledWith(
      expect.objectContaining({
        authData: "auth",
        vehicleId: 42,
        redirectToCarPage: expect.any(Function),
      })
    );
  });

  it("redirects correctly on click via redirectToCarPage", () => {
    Storage.prototype.getItem = jest.fn(() => "auth");
    mockUseSimilarVehicles.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        similar_vehicles: [{ id: 1, vin: "XYZ" }],
      },
    });

    let capturedRedirect: (id: number) => void = () => {};
    mockRecommendations.mockImplementation(({ redirectToCarPage }) => {
      capturedRedirect = redirectToCarPage;
      return <div data-testid="recommendations">Recommendations</div>;
    });

    render(<SimilarVehicleRecommendationsContainer />);
    capturedRedirect(99);
    expect(mockPush).toHaveBeenCalledWith("/cars/99");
  });
});
