import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Item from "./item";
import { ItemProps } from "./item.types";

const defaultProps: ItemProps = {
  imgSrc: "/test-icon.png",
  title: "Test Title",
  description: "This is a test description.",
};

describe("Item component", () => {
  it("renders image with correct src, alt, and default dimensions", () => {
    render(<Item {...defaultProps} />);

    const image = screen.getByRole("img") as HTMLImageElement;

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("test-icon.png")
    );
    expect(image).toHaveAttribute("alt", "Icon");
    expect(image).toHaveAttribute("width", "60");
    expect(image).toHaveAttribute("height", "60");
  });

  it("renders provided title and description", () => {
    render(<Item {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test description.")).toBeInTheDocument();
  });

  it("uses custom width and height if provided", () => {
    render(<Item {...defaultProps} imgWidth={100} imgHeight={80} />);

    const image = screen.getByRole("img") as HTMLImageElement;

    expect(image).toHaveAttribute("width", "100");
    expect(image).toHaveAttribute("height", "80");
  });
});
