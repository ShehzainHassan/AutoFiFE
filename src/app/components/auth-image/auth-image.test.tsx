import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthImage from "./auth-image";

describe("AuthImage", () => {
  it("renders background, logos, title, and description", () => {
    render(<AuthImage />);

    expect(screen.getByAltText("hero")).toBeInTheDocument();
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByAltText("Boxcars")).toBeInTheDocument();

    expect(screen.getByText("BoxCars")).toBeInTheDocument();
    expect(
      screen.getByText("Buy & Sell Cars: Reviews, Prices and Finance")
    ).toBeInTheDocument();
  });
});
