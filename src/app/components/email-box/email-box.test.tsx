import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmailBox from "./email-box";

describe("EmailBox", () => {
  it("renders the email input and button", () => {
    render(<EmailBox />);

    const input = screen.getByPlaceholderText("Your email address");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");

    const button = screen.getByRole("button", { name: "Sign up" });
    expect(button).toBeInTheDocument();
  });
});
