import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BrandCard from "./brand-card";

describe("BrandCard", () => {
  it("renders brand image and name", () => {
    render(<BrandCard brand="Audi" onClick={jest.fn()} />);

    expect(screen.getByAltText("brand-logo")).toBeInTheDocument();
    expect(screen.getByText("Audi")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const mockClick = jest.fn();
    render(<BrandCard brand="Audi" onClick={mockClick} />);

    fireEvent.click(screen.getByText("Audi"));
    expect(mockClick).toHaveBeenCalled();
  });
});
