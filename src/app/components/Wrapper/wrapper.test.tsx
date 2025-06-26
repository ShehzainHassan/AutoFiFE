import { render, screen } from "@testing-library/react";
import Wrapper from "./wrapper";

it("renders children", () => {
  render(
    <Wrapper backgroundColor="var(--color-black100)" padding="10px">
      <p>Hello</p>
    </Wrapper>
  );
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
