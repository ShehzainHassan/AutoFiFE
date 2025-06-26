import { fireEvent, render, screen } from "@testing-library/react";
import InputEmail from "./input-email";

jest.mock("../../input-field", () => {
  const Label = ({ children }: { children: React.ReactNode }) => (
    <label>{children}</label>
  );
  const Field = ({
    value,
    onChange,
    className,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
  }) => (
    <input
      data-testid="email-input"
      value={value}
      onChange={onChange}
      className={className}
    />
  );

  return {
    Input: Object.assign(
      ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      { Label, Field }
    ),
  };
});

jest.mock("@/utilities/utilities", () => ({
  validateEmail: jest.fn(() => ""),
}));

const mockSetFormData = jest.fn();
jest.mock("@/contexts/questionnaire-context", () => ({
  useQuestionnaire: () => ({
    formData: { email: "test@example.com" },
    setFormData: mockSetFormData,
  }),
}));

describe("InputEmail Component", () => {
  const setErrors = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the label and input field", () => {
    render(<InputEmail errors={{}} setErrors={setErrors} />);
    expect(screen.getByText("Email address")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
  });

  it("calls setFormData and setErrors on input change", () => {
    render(<InputEmail errors={{}} setErrors={setErrors} />);

    const input = screen.getByTestId("email-input");
    fireEvent.change(input, { target: { value: "new@example.com" } });

    expect(setErrors).toHaveBeenCalled();
    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
  });

  it("adds invalid class if there's an error", () => {
    render(
      <InputEmail errors={{ email: "Invalid email" }} setErrors={setErrors} />
    );

    const input = screen.getByTestId("email-input");
    expect(input.className).toContain("invalid");
  });
});
