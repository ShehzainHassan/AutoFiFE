import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ButtonPrimary } from "@/app/components";
import { ThemeProvider } from "@/theme/themeContext";

const mockTheme = {
  buttonPrimary: {
    backgroundColor: "var(--color-black500)",
    hoverColor: "var(--color-black1000)",
    borderRadius: "8px",
    padding: "10px",
    textColor: "var(--color-white100)",
    border: "1px solid var(--color-black500)",
  },
};

const customRender = (ui: React.ReactElement) => {
  return render(<ThemeProvider value={mockTheme}>{ui}</ThemeProvider>);
};

describe("ButtonPrimary", () => {
  it("renders button with text", () => {
    customRender(<ButtonPrimary btnText="Click Me" onClick={jest.fn()} />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when not disabled", () => {
    const mockClick = jest.fn();
    customRender(<ButtonPrimary btnText="Click Me" onClick={mockClick} />);
    const button = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalled();
  });

  it("does not call onClick when disabled", () => {
    const mockClick = jest.fn();
    customRender(
      <ButtonPrimary btnText="Click Me" onClick={mockClick} isDisabled />
    );
    const button = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(button);
    expect(mockClick).not.toHaveBeenCalled();
  });

  it("renders icon if imgSrc is provided", () => {
    customRender(
      <ButtonPrimary
        btnText="Click"
        onClick={jest.fn()}
        imgSrc="/images/icon.png"
      />
    );
    expect(screen.getByAltText("icon")).toBeInTheDocument();
  });

  it("applies correct styles on hover", () => {
    customRender(<ButtonPrimary btnText="Hover Me" onClick={jest.fn()} />);
    const container = screen.getByText("Hover Me").parentElement!;
    fireEvent.mouseEnter(container);
    expect(container).toHaveStyle({
      backgroundColor: "var(--color-black1000)",
    });
    fireEvent.mouseLeave(container);
    expect(container).toHaveStyle({ backgroundColor: "var(--color-black500)" });
  });

  it("applies disabled styles", () => {
    customRender(
      <ButtonPrimary btnText="Disabled" onClick={jest.fn()} isDisabled />
    );
    const container = screen.getByText("Disabled").parentElement!;
    expect(container).toHaveStyle({ opacity: "0.6" });
    expect(container).toHaveStyle({ pointerEvents: "none" });
  });
});
