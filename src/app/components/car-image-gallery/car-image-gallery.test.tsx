import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CarImageGallery from "./car-image-gallery";

jest.mock("../result-card/car-image/car-image", () => ({
  __esModule: true,
  default: ({ children }: React.PropsWithChildren<object>) => (
    <div data-testid="car-image">{children}</div>
  ),
}));

jest.mock("../result-card/handle-like/handle-like", () => ({
  __esModule: true,
  default: () => <div data-testid="handle-like" />,
}));

jest.mock("../result-card/handle-share/handle-share", () => ({
  __esModule: true,
  default: () => <div data-testid="handle-share" />,
}));

import Image from "next/image";

jest.mock("../car-images/car-images", () => ({
  __esModule: true,
  default: ({
    imgSrc,
    selected,
    onClick,
  }: {
    imgSrc: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <Image
      src={imgSrc}
      alt={selected ? "selected-thumbnail" : "thumbnail"}
      onClick={onClick}
      data-testid="thumbnail"
      width={100}
      height={100}
    />
  ),
}));

jest.mock("../buttons/button-navigate/button-navigate", () => ({
  __esModule: true,
  default: ({ type, onClick }: { type: string; onClick: () => void }) => (
    <button onClick={onClick} data-testid={`navigate-${type}`}>
      {type}
    </button>
  ),
}));

describe("CarImageGallery", () => {
  const mockVehicle = {
    id: 123,
    make: "BMW",
    model: "3 Series",
    year: 2022,
    price: 35000,
    vin: "WBA8E9G51GNU12345",
    images: [
      "/img1.jpg",
      "/img2.jpg",
      "/img3.jpg",
      "/img4.jpg",
      "/img5.jpg",
      "/img6.jpg",
      "/img7.jpg",
    ],
    mileage: 15000,
    color: "Black",
    fuelType: "Gasoline",
    transmission: "Automatic",
    status: "NEW",
  };

  beforeEach(() => {
    render(<CarImageGallery vehicle={mockVehicle} />);
  });

  it("renders first image and count correctly", () => {
    expect(screen.getByTestId("car-image")).toBeInTheDocument();
    expect(screen.getByText("1 / 7")).toBeInTheDocument();
    expect(screen.getAllByTestId("thumbnail")).toHaveLength(7);
  });

  it("navigates to next image", () => {
    fireEvent.click(screen.getByTestId("navigate-next"));
    expect(screen.getByText("2 / 7")).toBeInTheDocument();
  });

  it("navigates to previous image from index 0", () => {
    fireEvent.click(screen.getByTestId("navigate-prev"));
    expect(screen.getByText("7 / 7")).toBeInTheDocument();
  });

  it("updates image when thumbnail is clicked", () => {
    const thumbnails = screen.getAllByTestId("thumbnail");
    fireEvent.click(thumbnails[3]);
    expect(screen.getByText("4 / 7")).toBeInTheDocument();
  });

  it("renders HandleShare and HandleLike components", () => {
    expect(screen.getByTestId("handle-like")).toBeInTheDocument();
    expect(screen.getByTestId("handle-share")).toBeInTheDocument();
  });
});
