import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NeedHelp from "./need-help";

describe("NeedHelp", () => {
  it("renders brand image and name", () => {
    render(<NeedHelp />);
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByAltText("help")).toBeInTheDocument();
    expect(screen.getByText("Need help?")).toBeInTheDocument();
  });
});
