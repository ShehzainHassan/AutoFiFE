import { render, screen, fireEvent } from "@testing-library/react";
import MaritalStatus from "./marital-status";
import { useQuestionnaire } from "@/contexts/questionnaire-context";
import { ThemeProvider } from "@/theme/themeContext";
import { WHITE_BLUE_THEME } from "@/constants/button-primary-themes";

jest.mock("@/contexts/questionnaire-context", () => ({
  useQuestionnaire: jest.fn(),
}));
jest.mock("@/app/components", () => ({
  ButtonPrimary: ({
    btnText,
    onClick,
  }: {
    btnText: string;
    onClick: () => void;
  }) => <button onClick={onClick}>{btnText}</button>,
}));
const mockSetFormData = jest.fn();

describe("MaritalStatus Component", () => {
  const mockNextStep = jest.fn();
  const mockOptions = ["Single", "Married", "Divorced"];

  beforeEach(() => {
    (useQuestionnaire as jest.Mock).mockReturnValue({
      setFormData: mockSetFormData,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all marital status options as buttons", () => {
    render(
      <ThemeProvider value={WHITE_BLUE_THEME}>
        <MaritalStatus options={mockOptions} nextStep={mockNextStep} />
      </ThemeProvider>
    );

    mockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls setFormData and nextStep when a button is clicked", () => {
    render(
      <ThemeProvider value={WHITE_BLUE_THEME}>
        <MaritalStatus options={mockOptions} nextStep={mockNextStep} />
      </ThemeProvider>
    );

    const singleButton = screen.getByText("Single");
    fireEvent.click(singleButton);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    expect(mockNextStep).toHaveBeenCalled();
  });
});
