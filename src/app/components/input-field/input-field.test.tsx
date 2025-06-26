import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./input-field";

describe("Input Component", () => {
  it("renders container with given width", () => {
    render(
      <Input width="300px">
        <div data-testid="child">Child</div>
      </Input>
    );
    const container = screen.getByTestId("child").parentElement;
    expect(container).toHaveStyle("width: 300px");
  });

  it("renders label correctly", () => {
    render(<Input.Label>Username</Input.Label>);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders input field with correct attributes", () => {
    render(
      <Input.Field
        placeholder="Enter email"
        type="email"
        value="test@example.com"
        onChange={() => {}}
      />
    );
    const input = screen.getByPlaceholderText(
      "Enter email"
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("email");
    expect(input.value).toBe("test@example.com");
  });

  it("calls onChange when value changes", () => {
    const handleChange = jest.fn();
    render(<Input.Field value="" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls onBlur when input loses focus", () => {
    const handleBlur = jest.fn();
    render(
      <Input.Field value="test" onBlur={handleBlur} onChange={() => {}} />
    );
    const input = screen.getByRole("textbox");
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });
});
