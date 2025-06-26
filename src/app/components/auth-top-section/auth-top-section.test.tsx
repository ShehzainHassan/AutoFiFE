import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopSection from "./auth-top-section";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("TopSection", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it("renders with correct texts", () => {
    render(
      <TopSection
        backText="Return Home"
        textRight="Have an account?"
        btnText="Login"
        onClick={jest.fn()}
      />
    );

    expect(screen.getByText("Return Home")).toBeInTheDocument();
    expect(screen.getByText("Have an account?")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("calls router.push when left button is clicked", () => {
    render(
      <TopSection
        backText="Return Home"
        textRight="Have an account?"
        btnText="Login"
        onClick={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Return Home"));
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("calls onClick when login button is clicked", () => {
    const mockClick = jest.fn();

    render(
      <TopSection
        backText="Return Home"
        textRight="Have an account?"
        btnText="Login"
        onClick={mockClick}
      />
    );

    fireEvent.click(screen.getByText("Login"));
    expect(mockClick).toHaveBeenCalled();
  });
});
