import { render, screen, fireEvent } from "@testing-library/react";
import Borrow from "./borrow";
import { useQuestionnaire } from "@/contexts/questionnaire-context";

jest.mock("../input-amount/input-amount", () => ({
  __esModule: true,
  default: ({ vehiclePrice }: { vehiclePrice: number }) => (
    <div data-testid="input-amount">
      InputAmount Mock (Price: {vehiclePrice})
    </div>
  ),
}));

jest.mock("../../buttons/button-primary/button-primary", () => ({
  __esModule: true,
  default: ({
    btnText,
    onClick,
    isDisabled,
  }: {
    btnText: string;
    onClick: () => void;
    isDisabled: boolean;
  }) => (
    <button disabled={isDisabled} onClick={onClick}>
      {btnText}
    </button>
  ),
}));

jest.mock("@/contexts/questionnaire-context", () => ({
  useQuestionnaire: jest.fn(),
}));

const mockSetFormData = jest.fn();
const mockNextStep = jest.fn();

describe("Borrow Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders heading, explanation, and children correctly", () => {
    (useQuestionnaire as jest.Mock).mockReturnValue({
      formData: { notSure: false, borrowAmount: 10000 },
      setFormData: mockSetFormData,
    });

    render(<Borrow vehiclePrice={25000} nextStep={mockNextStep} />);

    expect(
      screen.getByText("How much would you like to borrow?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Don't worry, you can change this later/i)
    ).toBeInTheDocument();

    expect(screen.getByTestId("input-amount")).toHaveTextContent(
      "Price: 25000"
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("button", { name: /continue/i })).toBeEnabled();
  });

  it("disables continue button when borrowAmount is 0", () => {
    (useQuestionnaire as jest.Mock).mockReturnValue({
      formData: { notSure: false, borrowAmount: 0 },
      setFormData: mockSetFormData,
    });

    render(<Borrow vehiclePrice={20000} nextStep={mockNextStep} />);

    expect(screen.getByRole("button", { name: /continue/i })).toBeDisabled();
  });

  it("updates notSure in formData when checkbox is clicked", () => {
    (useQuestionnaire as jest.Mock).mockReturnValue({
      formData: { notSure: false, borrowAmount: 5000 },
      setFormData: mockSetFormData,
    });

    render(<Borrow vehiclePrice={30000} nextStep={mockNextStep} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
  });

  it("calls nextStep when continue is clicked", () => {
    (useQuestionnaire as jest.Mock).mockReturnValue({
      formData: { notSure: false, borrowAmount: 15000 },
      setFormData: mockSetFormData,
    });

    render(<Borrow vehiclePrice={40000} nextStep={mockNextStep} />);
    const button = screen.getByRole("button", { name: /continue/i });

    fireEvent.click(button);

    expect(mockNextStep).toHaveBeenCalled();
  });
});
