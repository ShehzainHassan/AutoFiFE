import { render, screen, fireEvent } from "@testing-library/react";
import FeaturedIcon from "./featured-icons";

describe("FeaturedIcon", () => {
  it("renders the image with correct src and alt", () => {
    render(<FeaturedIcon model="SUV" />);

    const image = screen.getByAltText("car-icon");
    expect(image).toBeInTheDocument();
  });

  it("renders the correct model text", () => {
    render(<FeaturedIcon model="Hatchback" />);
    expect(screen.getByText("Hatchback")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const mockOnClick = jest.fn();
    render(<FeaturedIcon model="Sedan" onClick={mockOnClick} />);

    const container = screen.getByText("Sedan").parentElement;
    fireEvent.click(container!);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
