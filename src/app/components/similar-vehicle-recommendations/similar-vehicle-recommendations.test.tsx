import { screen, fireEvent } from "@testing-library/react";
import { renderWithClient } from "@/test-utils/render-with-client";

jest.mock("@/hooks/useSimilarVehicles", () => jest.fn());
import { SimilarVehicleRecommendations } from "@/app/components";
import useSimilarVehicles from "@/hooks/useSimilarVehicles";

describe("SimilarVehicleRecommendations", () => {
  const mockVehicles = {
    similar_vehicles: [
      {
        vehicle_id: 1,
        similarity_score: 0.86,
        features: {
          Price: "24000",
          Mileage: "12000",
          Make: "Toyota",
          Model: "Corolla",
          Year: "2022",
        },
      },
      {
        vehicle_id: 2,
        similarity_score: 0.92,
        features: {
          Price: "27000",
          Mileage: "8000",
          Make: "Honda",
          Model: "Civic",
          Year: "2023",
        },
      },
    ],
  };

  const mockRedirect = jest.fn();

  beforeEach(() => {
    (useSimilarVehicles as jest.Mock).mockReturnValue({
      data: mockVehicles,
    });
  });

  it("renders heading and vehicle cards", () => {
    renderWithClient(
      <SimilarVehicleRecommendations
        vehicleId={1}
        redirectToCarPage={mockRedirect}
      />
    );

    expect(screen.getByText("Recommendations")).toBeInTheDocument();

    expect(screen.getByText("2022 Toyota Corolla")).toBeInTheDocument();
    expect(screen.getByText("$24,000")).toBeInTheDocument();
    expect(screen.getByText("Mileage 12,000")).toBeInTheDocument();
    expect(screen.getByText("86.0%")).toBeInTheDocument();

    expect(screen.getByText("2023 Honda Civic")).toBeInTheDocument();
    expect(screen.getByText("$27,000")).toBeInTheDocument();
    expect(screen.getByText("Mileage 8,000")).toBeInTheDocument();
    expect(screen.getByText("92.0%")).toBeInTheDocument();
  });

  it("calls redirectToCarPage when a card is clicked", () => {
    renderWithClient(
      <SimilarVehicleRecommendations
        vehicleId={1}
        redirectToCarPage={mockRedirect}
      />
    );

    const firstCard = screen.getByText("2022 Toyota Corolla").closest("div");
    fireEvent.click(firstCard!);

    expect(mockRedirect).toHaveBeenCalledWith(1);
  });
});
