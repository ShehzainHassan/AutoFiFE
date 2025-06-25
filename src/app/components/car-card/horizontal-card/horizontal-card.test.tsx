import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HorizontalCarCard from "./horizontal-card";
import { useRouter } from "next/navigation";
import useTracking from "@/hooks/useTracking";
import { CURRENCY } from "@/constants";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useTracking", () => jest.fn());

describe("HorizontalCarCard", () => {
  const mockPush = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useTracking as jest.Mock).mockReturnValue({ mutate: mockMutate });
  });

  const defaultProps = {
    id: 123,
    imgSrc: "/images/car.png",
    carDetails: "Toyota Camry 2023",
    carDescription: "A reliable family sedan with great mileage.",
    miles: "15,000 miles",
    fuelType: "Petrol",
    gearType: "Automatic",
    price: 25000,
    tag: "Hot Deal",
    tagColor: "red",
    btnText: "View Details",
    showPreviousPrice: true,
  };

  it("renders all car info correctly", () => {
    render(<HorizontalCarCard {...defaultProps} />);

    expect(screen.getByText("Toyota Camry 2023")).toBeInTheDocument();
    expect(
      screen.getByText("A reliable family sedan with great mileage.")
    ).toBeInTheDocument();
    expect(screen.getByText("15,000 miles")).toBeInTheDocument();
    expect(screen.getByText("Petrol")).toBeInTheDocument();
    expect(screen.getByText("Automatic")).toBeInTheDocument();
    expect(
      screen.getAllByText(`${CURRENCY}${defaultProps.price.toLocaleString()}`)
    ).toHaveLength(2);
    expect(screen.getByText("Hot Deal")).toBeInTheDocument();
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });

  it("does not render previous price when showPreviousPrice is false", () => {
    render(<HorizontalCarCard {...defaultProps} showPreviousPrice={false} />);
    const prevPrice = screen.queryByText(
      `${CURRENCY}${defaultProps.price.toLocaleString()}`
    );
    expect(prevPrice).toBeInTheDocument();
  });

  it("calls router.push and addInteraction on card click", () => {
    render(<HorizontalCarCard {...defaultProps} />);

    const card = screen.getByText("Toyota Camry 2023").closest("div")!;
    fireEvent.click(card);

    expect(mockPush).toHaveBeenCalledWith("/cars/123");
    expect(mockMutate).toHaveBeenCalledWith({
      vehicleId: 123,
      interactionType: "view",
    });
  });

  it("renders default props safely", () => {
    render(
      <HorizontalCarCard
        id={1}
        imgSrc="/car.png"
        carDetails="Test Car"
        carDescription="Nice car"
        miles="10k"
        fuelType="Diesel"
        gearType="Manual"
        price={15000}
      />
    );

    expect(screen.getByText("Test Car")).toBeInTheDocument();
    expect(screen.getByText("Nice car")).toBeInTheDocument();
  });
});
