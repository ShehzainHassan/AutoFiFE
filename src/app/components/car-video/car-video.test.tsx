import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CarVideo from "./car-video";

describe("CarVideo", () => {
  beforeEach(() => {
    render(<CarVideo />);
  });

  it("renders the video title and description", () => {
    expect(
      screen.getByText("Get A Fair Price For Your Car Sell To Us Today")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "We are committed to providing our customers with exceptional service, competitive pricing, and wide range of."
      )
    ).toBeInTheDocument();
  });

  it("renders all benefits with check icons", () => {
    const benefits = [
      "We are the UK's largest provider, with more patrols in more places",
      "You get 24/7 roadside assistance",
      "We fix 4 out of 5 cars at the roadside",
    ];

    benefits.forEach((benefit) => {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    });

    const icons = screen.getAllByRole("img", { hidden: true });
    const checkIcons = icons.filter((icon) =>
      icon.classList.contains("fa-check")
    );
    expect(checkIcons.length).toBeGreaterThanOrEqual(3);
  });

  it("renders the thumbnail image", () => {
    const image = screen.getByAltText("thumbnail") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/images/thumbnail.jpg");
  });

  it("renders the play button image", () => {
    const playImg = screen.getByAltText("play") as HTMLImageElement;
    expect(playImg).toBeInTheDocument();
    expect(playImg.src).toContain("/images/play.png");
  });

  it("renders the 'Get Started' button", () => {
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });
});
