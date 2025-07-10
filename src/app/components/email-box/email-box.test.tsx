import useNewsLetter from "@/hooks/useNewsLetter";
import { fireEvent, render, screen } from "@testing-library/react";
import EmailBox from "./email-box";

jest.mock("@/hooks/useNewsLetter", () => jest.fn());

describe("EmailBox", () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    (useNewsLetter as jest.Mock).mockImplementation(
      (onSuccess: () => void) => ({
        mutate: (email: string) => {
          mockSubmit(email);
          onSuccess();
        },
        isPending: false,
      })
    );
  });

  it("renders input and button", () => {
    render(<EmailBox />);
    expect(
      screen.getByPlaceholderText(/your email address/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it("enables button on valid email", () => {
    render(<EmailBox />);
    const input = screen.getByPlaceholderText(/your email address/i);
    const button = screen.getByText(/sign up/i);

    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(button).not.toBeDisabled();
  });

  it("calls submitEmail when button is clicked", () => {
    render(<EmailBox />);
    const input = screen.getByPlaceholderText(/your email address/i);
    const button = screen.getByText(/sign up/i);

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    expect(mockSubmit).toHaveBeenCalledWith("test@example.com");
  });
});
