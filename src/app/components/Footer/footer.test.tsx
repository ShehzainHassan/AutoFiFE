import { render, screen } from "@testing-library/react";
import Footer from "./footer";
import "@testing-library/jest-dom";

jest.mock("../email-box/email-box", () => {
  const MockEmailBox = () => <div data-testid="email-box">EmailBox</div>;
  MockEmailBox.displayName = "MockEmailBox";
  return MockEmailBox;
});

describe("Footer component", () => {
  it("renders the join section title and description", () => {
    render(<Footer />);
    expect(screen.getByText("Join BoxCar")).toBeInTheDocument();
    expect(
      screen.getByText("Receive pricing updates, shopping tips & more")
    ).toBeInTheDocument();
  });

  it("renders the EmailBox component", () => {
    render(<Footer />);
    expect(screen.getByTestId("email-box")).toBeInTheDocument();
  });

  it("renders all footer column titles", () => {
    render(<Footer />);
    const columnTitles = [
      "Company",
      "Quick Links",
      "Our Brands",
      "Vehicle Type",
    ];
    columnTitles.forEach((title) => {
      expect(screen.getAllByText(title)[0]).toBeInTheDocument();
    });
  });

  it("renders all footer column items", () => {
    render(<Footer />);
    const expectedItems = [
      "About Us",
      "Blog",
      "Services",
      "FAQs",
      "Terms",
      "Contact Us",
      "Get in Touch",
      "Help center",
      "Live chat",
      "How it works",
      "Toyota",
      "Audi",
      "BMW",
      "Ford",
      "Nissan",
      "Volkswagen",
      "Sedan",
      "SUV",
      "Hybrid",
      "Electric",
      "Coupe",
      "Truck",
      "Convertible",
    ];
    expectedItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("renders the mobile app download section", () => {
    render(<Footer />);
    expect(screen.getByText("Our Mobile App")).toBeInTheDocument();
    expect(screen.getByText("App Store")).toBeInTheDocument();
    expect(screen.getByText("Play Store")).toBeInTheDocument();
  });

  it("renders social media icons", () => {
    render(<Footer />);
    const platforms = ["facebook", "twitter", "instagram", "linked-in"];
    platforms.forEach((altText) => {
      expect(screen.getByAltText(altText)).toBeInTheDocument();
    });
  });

  it("renders footer bottom content", () => {
    render(<Footer />);
    expect(
      screen.getByText("© 2025 BoxCar, All rights reserved")
    ).toBeInTheDocument();
    expect(screen.getByText("Terms & Conditions")).toBeInTheDocument();
    expect(screen.getByText("Privacy Notice")).toBeInTheDocument();
  });
});
