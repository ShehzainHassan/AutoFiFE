import { fireEvent, render, screen } from "@testing-library/react";
import InputAmount from "./input-amount";

let mockFormData = { borrowAmount: 0 };
const mockSetFormData = jest.fn();

jest.mock("@/contexts/questionnaire-context", () => ({
  useQuestionnaire: () => ({
    formData: mockFormData,
    setFormData: mockSetFormData,
  }),
}));

jest.mock("../../input-field", () => {
  const Label = ({ children }: { children: React.ReactNode }) => (
    <label>{children}</label>
  );
  const Field = ({
    value,
    onChange,
    className,
    placeholder,
    type,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
    type?: string;
  }) => (
    <input
      data-testid="amount-input"
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );

  return {
    Input: Object.assign(
      ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      { Label, Field }
    ),
  };
});

describe("InputAmount Component", () => {
  const vehiclePrice = 50000;

  beforeEach(() => {
    mockFormData = { borrowAmount: 0 };
    jest.clearAllMocks();
  });

  it("renders label and input", () => {
    render(<InputAmount vehiclePrice={vehiclePrice} />);
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByTestId("amount-input")).toBeInTheDocument();
  });

  it("calls setFormData with clamped value", () => {
    render(<InputAmount vehiclePrice={vehiclePrice} />);
    const input = screen.getByTestId("amount-input");

    fireEvent.change(input, { target: { value: "60000" } });

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    const updater = mockSetFormData.mock.calls[0][0];
    const result = updater({ borrowAmount: 0 });
    expect(result.borrowAmount).toBe(vehiclePrice);
  });

  it("shows check icon when amount is greater than 0", () => {
    mockFormData = { borrowAmount: 10000 };
    render(<InputAmount vehiclePrice={vehiclePrice} />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
