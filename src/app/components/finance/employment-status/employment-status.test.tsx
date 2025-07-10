import { render, screen, fireEvent } from "@testing-library/react";
import EmploymentStatus from "./employment-status";
import { useQuestionnaire } from "@/contexts/questionnaire-context";

interface ButtonPrimaryProps {
  btnText: string;
  onClick: () => void;
}

jest.mock("@/app/components", () => ({
  ButtonPrimary: ({ btnText, onClick }: ButtonPrimaryProps) => (
    <button onClick={onClick}>{btnText}</button>
  ),
}));

jest.mock("@/contexts/questionnaire-context", () => ({
  useQuestionnaire: jest.fn(),
}));

const mockSetFormData = jest.fn();

describe("EmploymentStatus Component", () => {
  const mockNextStep = jest.fn();
  const options = ["Employed", "Unemployed", "Student"];

  beforeEach(() => {
    (useQuestionnaire as jest.Mock).mockReturnValue({
      setFormData: mockSetFormData,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders heading and all option buttons", () => {
    render(<EmploymentStatus options={options} nextStep={mockNextStep} />);

    expect(
      screen.getByText("What is your employment status?")
    ).toBeInTheDocument();

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls setFormData and nextStep when an option is clicked", () => {
    render(<EmploymentStatus options={options} nextStep={mockNextStep} />);

    const studentBtn = screen.getByText("Student");
    fireEvent.click(studentBtn);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    expect(mockNextStep).toHaveBeenCalled();
  });

  it("updates formData correctly inside setFormData", () => {
    let newState = {};
    mockSetFormData.mockImplementation(
      (
        updater: (prevState: Record<string, unknown>) => Record<string, unknown>
      ) => {
        newState = updater({ existingKey: "existingValue" });
      }
    );

    render(<EmploymentStatus options={options} nextStep={mockNextStep} />);
    fireEvent.click(screen.getByText("Unemployed"));

    expect(newState).toEqual({
      existingKey: "existingValue",
      employmentStatus: "Unemployed",
    });
  });
});
