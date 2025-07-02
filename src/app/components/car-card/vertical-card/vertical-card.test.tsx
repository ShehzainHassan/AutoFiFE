import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { VerticalCard } from "@/app/components";
import { useRouter } from "next/navigation";
import useTracking from "@/hooks/useTracking";
import { CURRENCY } from "@/constants";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("VerticalCard", () => {
  const mockPush = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useTracking as jest.Mock).mockReturnValue({ mutate: mockMutate });
  });

  const defaultProps = {
    id: 456,
    imgSrc: "/images/car.png",
    carDetails: "Honda Civic 2022",
    carDescription: "Compact sedan with excellent fuel economy.",
    miles: "20,000 miles",
    fuelType: "Petrol",
    gearType: "Manual",
    price: 20000,
    tag: "Featured",
    tagColor: "green",
    showPreviousPrice: true,
  };

  it("renders all car details correctly", () => {
    render(<VerticalCard {...defaultProps} />);

    expect(screen.getByText("Honda Civic 2022")).toBeInTheDocument();
    expect(
      screen.getByText("Compact sedan with excellent fuel economy.")
    ).toBeInTheDocument();
    expect(screen.getByText("20,000 miles")).toBeInTheDocument();
    expect(screen.getByText("Petrol")).toBeInTheDocument();
    expect(screen.getByText("Manual")).toBeInTheDocument();
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(
      screen.getAllByText(`${CURRENCY}${defaultProps.price.toLocaleString()}`)
    ).toHaveLength(2);
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });

  it("does not render cut price when showPreviousPrice is false", () => {
    render(<VerticalCard {...defaultProps} showPreviousPrice={false} />);
    const allPrices = screen.getAllByText(
      `${CURRENCY}${defaultProps.price.toLocaleString()}`
    );
    expect(allPrices).toHaveLength(1);
  });

  it("triggers navigation and tracking on card click", () => {
    render(<VerticalCard {...defaultProps} />);
    const card = screen.getByText("Honda Civic 2022").closest("div")!;
    fireEvent.click(card);
    expect(mockPush).toHaveBeenCalledWith("/cars/456");
    expect(mockMutate).toHaveBeenCalledWith({
      vehicleId: 456,
      interactionType: "view",
    });
  });

  it("renders safely with minimum required props", () => {
    render(
      <VerticalCard
        id={1}
        imgSrc="/car.png"
        carDetails="Test Car"
        carDescription="Description"
        miles="10k"
        fuelType="Diesel"
        gearType="Auto"
        price={18000}
      />
    );

    expect(screen.getByText("Test Car")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("10k")).toBeInTheDocument();
    expect(screen.getByText("Diesel")).toBeInTheDocument();
    expect(screen.getByText("Auto")).toBeInTheDocument();
    expect(screen.getByText(`${CURRENCY}18,000`)).toBeInTheDocument();
  });
});
