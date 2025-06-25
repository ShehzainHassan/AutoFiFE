import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CarImages from "./car-images";

describe("CarImages", () => {
  const mockOnClick = jest.fn();
  const imgSrc = "/images/BMW-X6-Card.png";

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders image with correct src and alt", () => {
    render(
      <CarImages imgSrc={imgSrc} selected={false} onClick={mockOnClick} />
    );

    const image = screen.getByAltText("car-image") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(imgSrc);
  });

  it("applies selected class when selected is true", () => {
    const { container } = render(
      <CarImages imgSrc={imgSrc} selected={true} onClick={mockOnClick} />
    );

    expect(container.firstChild).toHaveClass("selected");
  });

  it("does not apply selected class when selected is false", () => {
    const { container } = render(
      <CarImages imgSrc={imgSrc} selected={false} onClick={mockOnClick} />
    );

    expect(container.firstChild).not.toHaveClass("selected");
  });

  it("calls onClick when clicked", () => {
    render(
      <CarImages imgSrc={imgSrc} selected={false} onClick={mockOnClick} />
    );

    fireEvent.click(screen.getByAltText("car-image"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
