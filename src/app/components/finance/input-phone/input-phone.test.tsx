import { render, screen, fireEvent } from "@testing-library/react";
import InputPhone from "./input-phone";
import * as utils from "@/utilities/utilities";

let mockFormData = { phone: "" };
const mockSetFormData = jest.fn();

jest.mock("@/contexts/questionnaire-context", () => ({
  useQuestionnaire: () => ({
    formData: mockFormData,
    setFormData: mockSetFormData,
  }),
}));

jest.mock("@/utilities/utilities", () => ({
  validatePhoneNumber: jest.fn(() => ""),
}));

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
      data-testid="phone-input"
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

describe("InputPhone Component", () => {
  const setErrors = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormData = { phone: "" };
  });

  it("renders the label and input field", () => {
    render(<InputPhone errors={{}} setErrors={setErrors} />);
    expect(screen.getByText("Phone number")).toBeInTheDocument();
    expect(screen.getByTestId("phone-input")).toBeInTheDocument();
  });

  it("calls setFormData and setErrors on input change", () => {
    render(<InputPhone errors={{}} setErrors={setErrors} />);
    const input = screen.getByTestId("phone-input");

    fireEvent.change(input, { target: { value: "1234567890" } });

    expect(utils.validatePhoneNumber).toHaveBeenCalledWith("1234567890");
    expect(setErrors).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
  });

  it("adds invalid class if there's an error", () => {
    render(
      <InputPhone errors={{ phone: "Invalid number" }} setErrors={setErrors} />
    );
    const input = screen.getByTestId("phone-input");
    expect(input.className).toContain("invalid");
  });
});
