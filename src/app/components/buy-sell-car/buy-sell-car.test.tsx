import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BuySellCard } from "@/app/components";
describe("BuySellCard", () => {
  it("renders title, description, and button", () => {
    render(
      <BuySellCard
        title="Buy a Car"
        description="Find your dream car easily."
        type="Buy"
      />
    );

    expect(screen.getByText("Buy a Car")).toBeInTheDocument();
    expect(screen.getByText("Find your dream car easily.")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies blue background and button color for type 'Buy'", () => {
    render(
      <BuySellCard title="Buy" description="Buying description" type="Buy" />
    );

    const card = screen.getByText("Buy").closest("div");
    expect(card).toHaveStyle("background-color: var(--color-blue100)");
    const button = screen.getByText("Get Started").parentElement!;
    expect(button).toHaveStyle("background-color: var(--color-blue500)");
  });

  it("applies pink background and black button color for type 'Sell'", () => {
    render(
      <BuySellCard
        title="Sell"
        description="Selling description"
        type="Sell"
        imgSrc="/images/sell.png"
      />
    );

    const card = screen.getByText("Sell").closest("div");
    expect(card).toHaveStyle("background-color: var(--color-pink100)");
    const button = screen.getByText("Get Started").parentElement!;
    expect(button).toHaveStyle("background-color: var(--color-black100)");
  });

  it("renders default image if no imgSrc is passed", () => {
    render(
      <BuySellCard title="Buy" description="Buying description" type="Buy" />
    );

    const image = screen.getByAltText("car") as HTMLImageElement;
    expect(image.src).toContain("/images/buy.png");
  });

  it("renders custom image if imgSrc is passed", () => {
    render(
      <BuySellCard
        title="Sell"
        description="Selling description"
        type="Sell"
        imgSrc="/images/sell.png"
      />
    );

    const image = screen.getByAltText("car") as HTMLImageElement;
    expect(image.src).toContain("/images/sell.png");
  });
});
