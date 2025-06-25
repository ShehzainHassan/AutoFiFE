import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthInputField from "./auth-input";

describe("AuthInputField", () => {
  const baseProps = {
    iconImg: "/images/message.png",
    value: "john@example.com",
    onChange: jest.fn(),
    placeholder: "Enter email",
  };

  it("renders the input field with placeholder and icon", () => {
    render(<AuthInputField {...baseProps} />);

    const input = screen.getByPlaceholderText("Enter email");
    const icon = screen.getByAltText("icon");

    expect(input).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("calls onChange when user types", () => {
    render(<AuthInputField {...baseProps} />);

    const input = screen.getByPlaceholderText("Enter email");
    fireEvent.change(input, { target: { value: "test" } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it("shows toggle button only for password fields", () => {
    render(
      <AuthInputField
        {...baseProps}
        type="password"
        placeholder="Enter password"
      />
    );

    expect(screen.getByText("SHOW")).toBeInTheDocument();
  });

  it("toggles password visibility when clicking SHOW/HIDE", () => {
    render(
      <AuthInputField {...baseProps} type="password" placeholder="Password" />
    );

    const toggleBtn = screen.getByText("SHOW");
    const input = screen.getByPlaceholderText("Password");

    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(toggleBtn);
    expect(screen.getByText("HIDE")).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByText("HIDE"));
    expect(input).toHaveAttribute("type", "password");
  });

  it("does not render toggle button for non-password inputs", () => {
    render(<AuthInputField {...baseProps} type="text" />);
    expect(screen.queryByText("SHOW")).not.toBeInTheDocument();
  });
});
