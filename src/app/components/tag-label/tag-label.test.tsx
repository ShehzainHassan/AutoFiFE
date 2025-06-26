import { render, screen } from "@testing-library/react";
import { TagLabel } from "./tag-label";

describe("TagLabel", () => {
  it("renders the text correctly", () => {
    render(<TagLabel text="Featured" color="var(--color-yellow500)" />);
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("applies the correct background color style", () => {
    render(<TagLabel text="Great price" color="var(--color-green600)" />);
    const tagElement = screen.getByText("Great price");
    expect(tagElement).toHaveStyle("background-color: var(--color-green600)");
  });
});
