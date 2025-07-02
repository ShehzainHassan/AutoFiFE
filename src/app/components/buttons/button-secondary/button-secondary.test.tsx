import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ButtonSecondary } from "@/app/components";
describe("ButtonSecondary", () => {
  it("renders button with text", () => {
    render(<ButtonSecondary btnText="Explore More" onClick={jest.fn()} />);
    expect(screen.getByText("Explore More")).toBeInTheDocument();
  });

  it("renders arrow image", () => {
    render(<ButtonSecondary btnText="Explore More" onClick={jest.fn()} />);
    expect(screen.getByAltText("arrow")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const mockClick = jest.fn();
    render(<ButtonSecondary btnText="Explore" onClick={mockClick} />);
    fireEvent.click(screen.getByText("Explore"));
    expect(mockClick).toHaveBeenCalled();
  });

  it("changes background color on hover", () => {
    render(<ButtonSecondary btnText="Hover Test" onClick={jest.fn()} />);
    const container = screen.getByText("Hover Test").parentElement!;

    expect(container).toHaveStyle("background-color: var(--color-blue500)");

    fireEvent.mouseEnter(container);
    expect(container).toHaveStyle("background-color: var(--color-blue600)");

    fireEvent.mouseLeave(container);
    expect(container).toHaveStyle("background-color: var(--color-blue500)");
  });

  it("applies custom padding", () => {
    render(
      <ButtonSecondary
        btnText="Padding Test"
        onClick={jest.fn()}
        padding="12px"
      />
    );
    const container = screen.getByText("Padding Test").parentElement!;
    expect(container).toHaveStyle("padding: 12px");
  });
});
