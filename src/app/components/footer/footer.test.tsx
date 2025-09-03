import { render, screen, fireEvent } from "@testing-library/react";
import Footer from ".";
import { useRouter } from "next/navigation";
import { useSearch } from "@/contexts/car-search-context/car-search-context";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/car-search-context/car-search-context", () => ({
  useSearch: jest.fn(),
}));

jest.mock("../email-box/email-box", () => {
  const MockEmailBox = () => <div>EmailBox Component</div>;
  MockEmailBox.displayName = "EmailBox";
  return MockEmailBox;
});

describe("Footer Component", () => {
  const pushMock = jest.fn();
  const setMainSearch = jest.fn();
  const setStagedSearch = jest.fn();
  const setSearchParams = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    (useSearch as jest.Mock).mockReturnValue({
      mainSearch: {},
      stagedSearch: {},
      searchParams: {},
      setMainSearch,
      setStagedSearch,
      setSearchParams,
    });

    pushMock.mockClear();
  });

  it("renders all footer titles", () => {
    render(<Footer />);
    expect(screen.getByText("Join BoxCar")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Our Brands")).toBeInTheDocument();
    expect(screen.getByText("Vehicle Type")).toBeInTheDocument();
    expect(screen.getByText("Our Mobile App")).toBeInTheDocument();
  });

  it("renders social icons", () => {
    render(<Footer />);
    const socialIcons = screen.getAllByRole("img", { hidden: true });
    expect(socialIcons.length).toBeGreaterThanOrEqual(6);
  });

  it("renders EmailBox component", () => {
    render(<Footer />);
    expect(screen.getByText("EmailBox Component")).toBeInTheDocument();
  });

  it("calls handleBrandClick when brand is clicked", () => {
    render(<Footer />);
    const brand = screen.getByText("Toyota");
    fireEvent.click(brand);
    expect(setMainSearch).toHaveBeenCalledWith(
      expect.objectContaining({ make: "Toyota", model: "Any_Models" })
    );
    expect(pushMock).toHaveBeenCalledWith("/search?make=Toyota");
  });

  it("renders copyright", () => {
    render(<Footer />);
    expect(
      screen.getByText("© 2025 BoxCar, All rights reserved")
    ).toBeInTheDocument();
  });
});
