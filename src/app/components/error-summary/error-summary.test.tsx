import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorSummary from "./error-summary";

describe("ErrorSummary", () => {
  const errorMessages = {
    fname: "First name is required",
    lname: "Last name is required",
    postcode: "Postcode is invalid",
    email: "Email is not valid",
    phone: "Phone number is required",
  };

  it("does not render when no errors are present", () => {
    const emptyErrors = {
      fname: "",
      lname: "",
      postcode: "",
      email: "",
      phone: "",
    };

    const { container } = render(<ErrorSummary errors={emptyErrors} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders warning icon and error messages when errors are present", () => {
    render(<ErrorSummary errors={errorMessages} />);

    const warningIcon = screen.getByAltText("warning");
    expect(warningIcon).toBeInTheDocument();

    Object.values(errorMessages).forEach((msg) => {
      expect(screen.getByText(msg)).toBeInTheDocument();
    });
  });

  it("renders only the provided error messages", () => {
    const partialErrors = {
      fname: "First name is required",
      lname: "",
      postcode: "",
      email: "Invalid email",
      phone: "",
    };

    render(<ErrorSummary errors={partialErrors} />);

    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Invalid email")).toBeInTheDocument();

    expect(screen.queryByText("Last name is required")).not.toBeInTheDocument();
    expect(screen.queryByText("Postcode is invalid")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Phone number is required")
    ).not.toBeInTheDocument();
  });
});
