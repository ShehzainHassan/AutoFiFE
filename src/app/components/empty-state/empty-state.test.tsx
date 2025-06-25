import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmptyState from "./empty-state";

describe("EmptyState", () => {
  it("renders the message with default color", () => {
    render(<EmptyState message="No cars found" />);

    const element = screen.getByText("No cars found");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("P");
    expect(element).toHaveClass("Text");
    expect(element).toHaveStyle("color: var(--color-black100)");
  });

  it("renders the message with custom color", () => {
    render(<EmptyState message="No results" color="var(--color-red500)" />);

    const element = screen.getByText("No results");
    expect(element).toHaveStyle("color: var(--color-red500)");
  });
});
