import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookmarkIcon from "./bookmark-icon";

describe("BookmarkIcon", () => {
  it("renders bookmark icon", () => {
    render(<BookmarkIcon />);
    expect(screen.getByAltText("bookmark")).toBeInTheDocument();
  });
});
