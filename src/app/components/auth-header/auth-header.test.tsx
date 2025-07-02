import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthHeader } from "@/app/components"

describe("AuthHeader", () => {
  it("renders title and subtitle correctly", () => {
    render(<AuthHeader title="Welcome Back" subTitle="Log in to continue" />);
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByText("Log in to continue")).toBeInTheDocument();
  });
});
