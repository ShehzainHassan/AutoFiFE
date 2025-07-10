import { render, screen, fireEvent } from "@testing-library/react";
import AuthButton from "./auth-button";

jest.mock("@/assets/images/icons/arrow-white.png", () => "arrow-white.png");

describe("AuthButton", () => {
  it("renders the button text", () => {
    render(<AuthButton btnText="Continue" onClick={() => {}} />);
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("renders the arrow icon", () => {
    render(<AuthButton btnText="Continue" onClick={() => {}} />);
    expect(screen.getByAltText("arrow")).toBeInTheDocument();
  });

  it("calls onClick when clicked and not disabled", () => {
    const mockClick = jest.fn();
    render(<AuthButton btnText="Continue" onClick={mockClick} />);
    fireEvent.click(screen.getByText("Continue"));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onClick when disabled", () => {
    const mockClick = jest.fn();
    render(<AuthButton btnText="Continue" onClick={mockClick} disabled />);
    fireEvent.click(screen.getByText("Continue"));
    expect(mockClick).not.toHaveBeenCalled();
  });

  it("applies disabled styles when disabled", () => {
    const { container } = render(
      <AuthButton btnText="Disabled" onClick={() => {}} disabled />
    );
    expect(container.firstChild).toHaveClass("disabled");
  });
});
