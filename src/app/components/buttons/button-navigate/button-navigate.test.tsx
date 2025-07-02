import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ButtonNavigate } from "@/app/components";

describe("ButtonNavigate", () => {
  it("renders the default next button", () => {
    render(<ButtonNavigate type="next" onClick={jest.fn()} />);
    const image = screen.getByAltText("next");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("next.png"));
  });

  it("renders the white button image when whiteButton is true", () => {
    render(<ButtonNavigate type="next" onClick={jest.fn()} whiteButton />);
    const image = screen.getByAltText("next");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("next-white.png")
    );
  });

  it("applies the 'prev' class when type is 'prev'", () => {
    render(<ButtonNavigate type="prev" onClick={jest.fn()} />);
    const image = screen.getByAltText("prev");
    expect(image.className).toMatch(/prev/);
  });

  it("calls onClick handler when clicked", () => {
    const mockClick = jest.fn();
    render(<ButtonNavigate type="next" onClick={mockClick} />);
    fireEvent.click(screen.getByRole("img"));
    expect(mockClick).toHaveBeenCalled();
  });
});
