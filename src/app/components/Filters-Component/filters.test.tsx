import { render, screen } from "@testing-library/react";
import { Filters} from "@/app/components";
import { CarSearchProvider } from "@/contexts/car-search-context/car-search-context";

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

describe("Filters component", () => {
  const renderWithProvider = () =>
    render(
      <CarSearchProvider>
        <Filters />
      </CarSearchProvider>
    );

  it("renders all expandable filter sections", () => {
    renderWithProvider();

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Years")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Mileage")).toBeInTheDocument();
    expect(screen.getByText("Gearbox")).toBeInTheDocument();
    expect(screen.getByText("Exterior color")).toBeInTheDocument();
  });

  it("renders Expandable sections", () => {
    renderWithProvider();

    const titles = [
      "Status",
      "Years",
      "Price",
      "Mileage",
      "Gearbox",
      "Exterior color",
    ];

    const rendered = titles.filter((title) => screen.queryByText(title));

    expect(rendered).toHaveLength(6);
  });
});
