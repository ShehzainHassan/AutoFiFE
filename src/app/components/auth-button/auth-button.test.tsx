import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthButton from "./auth-button";

describe("AuthButton", () => {
  it("renders the button with text", () => {
    render(<AuthButton btnText="Proceed to my Account" onClick={jest.fn()} />);
    expect(screen.getByText("Proceed to my Account")).toBeInTheDocument();
  });

  it("calls onClick when not disabled", () => {
    const mockFn = jest.fn();
    render(<AuthButton btnText="Proceed to my Account" onClick={mockFn} />);
    fireEvent.click(screen.getByText("Proceed to my Account"));
    expect(mockFn).toHaveBeenCalled();
  });

  it("does not call onClick when disabled", () => {
    const mockFn = jest.fn();
    render(
      <AuthButton btnText="Proceed to my Account" onClick={mockFn} disabled />
    );
    fireEvent.click(screen.getByText("Proceed to my Account"));
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("renders arrow image", () => {
    render(<AuthButton btnText="Proceed to my Account" onClick={jest.fn()} />);
    expect(screen.getByAltText("arrow")).toBeInTheDocument();
  });
});
