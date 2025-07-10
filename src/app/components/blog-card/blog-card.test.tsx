import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogCard from "./blog-card";
describe("BlogCard", () => {
  const mockProps = {
    imgSrc: "/images/customer.png",
    sharedBy: "John",
    date: "June 20, 2024",
    description: "This is a test blog about new electric cars.",
    tag: "Electric",
  };

  it("renders all text content correctly", () => {
    render(<BlogCard {...mockProps} />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("June 20, 2024")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test blog about new electric cars.")
    ).toBeInTheDocument();
    expect(screen.getByText("Electric")).toBeInTheDocument();
  });

  it("renders the image with correct alt text", () => {
    render(<BlogCard {...mockProps} />);
    const image = screen.getByAltText("car");
    expect(image).toBeInTheDocument();
  });

  it("falls back to default sharedBy and date if not provided", () => {
    render(
      <BlogCard
        imgSrc="/images/customer.png"
        description="No author or date provided"
        tag="News"
      />
    );
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("November 22, 2023")).toBeInTheDocument();
  });
});
