import { render, screen, fireEvent } from "@testing-library/react";
import MaritalStatus from "./marital-status";

const mockSetFormData = jest.fn();
const mockNextStep = jest.fn();

jest.mock("@/contexts/questionnaire-context", () => ({
  useQuestionnaire: () => ({
    setFormData: mockSetFormData,
  }),
}));

jest.mock("../../buttons/button-primary/button-primary", () => ({
  __esModule: true,
  default: ({ btnText, onClick }: { btnText: string; onClick: () => void }) => (
    <button onClick={onClick}>{btnText}</button>
  ),
}));

describe("MaritalStatus Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all marital status options", () => {
    render(<MaritalStatus nextStep={mockNextStep} />);
    const options = [
      "Married",
      "Single",
      "Cohabiting",
      "Divorce",
      "Separated",
      "Widowed",
      "Civil partnership",
    ];
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("sets formData and calls nextStep when a button is clicked", () => {
    render(<MaritalStatus nextStep={mockNextStep} />);
    const singleBtn = screen.getByText("Single");

    fireEvent.click(singleBtn);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    expect(mockNextStep).toHaveBeenCalled();
  });
});
