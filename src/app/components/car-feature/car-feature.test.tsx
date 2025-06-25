import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CarFeature from "./car-feature";

const getExpectedImage = (title: string) => {
  switch (title) {
    case "Mileage":
      return "/images/mileage.png";
    case "Drivetrain":
      return "/images/drivetrain.png";
    case "Exterior color":
      return "/images/color.png";
    case "MPG":
      return "/images/mpg.png";
    case "Engine":
      return "/images/engine.png";
    case "Fuel type":
      return "/images/fuel-type.png";
    case "Gearbox":
      return "/images/gearbox.png";
    case "ULEZ compliant":
      return "/images/ulez.png";
    default:
      return "/images/mileage.png";
  }
};

describe("CarFeature", () => {
  const features = [
    { title: "Mileage", value: "20,000 miles" },
    { title: "Drivetrain", value: "AWD" },
    { title: "Exterior color", value: "Red" },
    { title: "MPG", value: "32 MPG" },
    { title: "Engine", value: "2.0L Turbo" },
    { title: "Fuel type", value: "Diesel" },
    { title: "Gearbox", value: "Automatic" },
    { title: "ULEZ compliant", value: "Yes" },
  ];

  it.each(features)(
    "renders feature for %s with correct image and value",
    ({ title, value }) => {
      render(<CarFeature title={title} value={value} />);

      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();

      const img = screen.getByAltText("icon") as HTMLImageElement;
      expect(img.src).toContain(getExpectedImage(title));
    }
  );

  it("falls back to default image for unknown title", () => {
    render(<CarFeature title="Unknown feature" value="123" />);
    const img = screen.getByAltText("icon") as HTMLImageElement;
    expect(img.src).toContain("/images/mileage.png");
  });
});
