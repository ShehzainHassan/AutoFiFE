import { render, screen } from "@testing-library/react";
import ErrorMessage from "./error-message";
import "@testing-library/jest-dom";

describe("ErrorMessage", () => {
  it("renders the error message with correct text", () => {
    const errorText = "This field is required";

    render(<ErrorMessage message={errorText} />);

    const paragraph = screen.getByText(errorText);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe("P");
    expect(paragraph).toHaveClass("errorText");
  });
});
