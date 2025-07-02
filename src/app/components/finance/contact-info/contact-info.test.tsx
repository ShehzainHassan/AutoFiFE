import { render, screen, fireEvent } from "@testing-library/react";
import { toast } from "react-toastify";
import ContactInfo from "./contact-info";

const mockMutate = jest.fn();
const mockPush = jest.fn();
const mockSetFormData = jest.fn();

jest.mock("@/contexts/questionnaire-context", () => ({
  useQuestionnaire: () => ({
    formData: {
      drivingLicense: "Yes",
      maritalStatus: "Single",
      dob: { day: "01", month: "January", year: "2000" },
      employmentStatus: "Employed",
      borrowAmount: 5000,
      notSure: false,
      email: "test@example.com",
      phone: "1234567890",
    },
    setFormData: mockSetFormData,
  }),
}));

jest.mock("@/hooks/useSaveQuestionnaire", () => () => ({
  mutate: mockMutate,
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../input-email/input-email", () => ({
  __esModule: true,
  default: () => (
    <input data-testid="email" value="test@example.com" onChange={() => {}} />
  ),
}));

jest.mock("../input-phone/input-phone", () => ({
  __esModule: true,
  default: () => (
    <input data-testid="phone" value="1234567890" onChange={() => {}} />
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

jest.mock("../../error-summary/error-summary", () => ({
  __esModule: true,
  default: () => <div data-testid="error-summary" />,
}));

describe("ContactInfo Component", () => {
  const id = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders required elements", () => {
    render(<ContactInfo id={id} />);
    expect(
      screen.getByText(/where should we send your quote/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("phone")).toBeInTheDocument();
    expect(screen.getByText(/get my quote/i)).toBeInTheDocument();
    expect(screen.getByTestId("error-summary")).toBeInTheDocument();
  });

  it("disables the button by default", () => {
    render(<ContactInfo id={id} />);
    expect(screen.getByText("Get my quote")).toBeDisabled();
  });

  it("enables submit and calls mutate when form is valid", () => {
    render(<ContactInfo id={id} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const button = screen.getByText("Get my quote");
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    expect(mockMutate).toHaveBeenCalledWith(
      {
        questionnaire: expect.objectContaining({
          drivingLicense: "Yes",
          maritalStatus: "Single",
          dob: "2000-01-01",
          employmentStatus: "Employed",
          borrowAmount: 5000,
          notSure: false,
          email: "test@example.com",
          phone: "1234567890",
        }),
        vehicleId: id,
      },
      expect.any(Object)
    );
  });

  it("handles mutation success", () => {
    render(<ContactInfo id={id} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const successCallback = jest.fn();
    mockMutate.mockImplementation((_, { onSuccess }) => {
      onSuccess();
      successCallback();
    });

    fireEvent.click(screen.getByText("Get my quote"));

    expect(toast.success).toHaveBeenCalledWith("Quote generated successfully!");
    expect(mockSetFormData).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith(`/cars/${id}`);
    expect(successCallback).toHaveBeenCalled();
  });

  it("handles mutation error", () => {
    render(<ContactInfo id={id} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    mockMutate.mockImplementation((_, { onError }) => {
      onError();
    });

    fireEvent.click(screen.getByText("Get my quote"));

    expect(toast.error).toHaveBeenCalledWith(
      "Something went wrong while generating the quote."
    );
  });
});
