import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LatestBlog from "./latest-blog";

const mockT = jest.fn();
jest.mock("@/i18n", () => ({
  __esModule: true,
  default: () => ({
    t: mockT,
  }),
}));

jest.mock("../blog-card/blog-card", () => {
  const MockBlogCard = (props: Record<string, unknown>) => (
    <div data-testid="blog-card">{props.description as string}</div>
  );
  MockBlogCard.displayName = "MockBlogCard";
  return MockBlogCard;
});
jest.mock("../buy-sell-car/buy-sell-car", () => {
  const MockBuySellCard = (props: Record<string, unknown>) => (
    <div data-testid="buy-sell-card">{props.title as string}</div>
  );
  MockBuySellCard.displayName = "MockBuySellCard";
  return MockBuySellCard;
});

jest.mock("../empty-state/empty-state", () => {
  const MockEmptyState = (props: Record<string, unknown>) => (
    <div data-testid="empty-state">{props.message as string}</div>
  );
  MockEmptyState.displayName = "MockEmptyState";
  return MockEmptyState;
});

jest.mock("../section-title/section-title", () => {
  const MockSectionTitle = (props: Record<string, unknown>) => (
    <div data-testid="section-title">{props.title as string}</div>
  );
  MockSectionTitle.displayName = "MockSectionTitle";
  return MockSectionTitle;
});

describe("LatestBlog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders blog posts and buy/sell cards when data is available", () => {
    mockT.mockImplementation((key: string) => {
      if (key === "latest_blog.blog") {
        return [
          {
            id: 1,
            imgSrc: "/blog1.jpg",
            description: "Blog 1 description",
            tag: "Tips",
          },
        ];
      }
      if (key === "latest_blog.car_cards") {
        return [
          {
            id: 1,
            imgSrc: "/car1.jpg",
            title: "Sell Your Car",
            type: "sell",
            description: "Easily list your car",
          },
        ];
      }
      return [];
    });

    render(<LatestBlog />);

    expect(screen.getByTestId("section-title")).toHaveTextContent(
      "Latest Blog Posts"
    );
    expect(screen.getByTestId("blog-card")).toHaveTextContent(
      "Blog 1 description"
    );
    expect(screen.getByTestId("buy-sell-card")).toHaveTextContent(
      "Sell Your Car"
    );
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
  });

  it("renders empty state when no blogs are available", () => {
    mockT.mockImplementation((key: string) => {
      if (key === "latest_blog.blog") return [];
      if (key === "latest_blog.car_cards") return [];
      return [];
    });

    render(<LatestBlog />);

    expect(screen.getByTestId("empty-state")).toHaveTextContent(
      "No blogs found"
    );
    expect(screen.queryByTestId("blog-card")).not.toBeInTheDocument();
    expect(screen.queryByTestId("buy-sell-card")).not.toBeInTheDocument();
  });
});
