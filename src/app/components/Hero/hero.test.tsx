import { FEATURED_MODELS } from "@/constants";
import { renderWithClient } from "@/test-utils/render-with-client";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import Hero from "./hero";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock("@/i18n", () => () => ({
  t: (key: string) =>
    ({
      "hero.subHeading": "Find your next car",
      "hero.title": "Search by Make, Model or Type",
    }[key] || key),
}));

const setMainSearchMock = jest.fn();
const setStagedSearchMock = jest.fn();
const setSearchParamsMock = jest.fn();

jest.mock("@/contexts/car-search-context/car-search-context", () => ({
  useSearch: () => ({
    mainSearch: {},
    stagedSearch: {},
    searchParams: {},
    setMainSearch: setMainSearchMock,
    setStagedSearch: setStagedSearchMock,
    setSearchParams: setSearchParamsMock,
  }),
}));

jest.mock("@/theme/themeContext", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useTheme: () => ({
    buttonPrimary: {
      tabColor: "var(--color-white100)",
      selectedTabColor: "var(--color-white100)",
      selectedTabBorderColor: "var(--color-white100)",
      borderColor: "var(--color-white100)",
    },
  }),
}));

jest.mock("@/utilities/utilities", () => ({
  getMakeByModel: (model: string) => {
    if (model === "Civic") return "Honda";
    return "Unknown";
  },
  getModelOptions: (make: string) => {
    if (make === "Honda") return [{ label: "Civic", value: "Civic" }];
    return [];
  },
}));
describe("Hero Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders hero section text", () => {
    renderWithClient(<Hero />);
    expect(screen.getByText("Find your next car")).toBeInTheDocument();
    expect(
      screen.getByText("Search by Make, Model or Type")
    ).toBeInTheDocument();
    expect(screen.getByText("Or Browse Featured Model")).toBeInTheDocument();
  });

  it("renders featured models", () => {
    renderWithClient(<Hero />);
    FEATURED_MODELS.forEach((model) => {
      expect(screen.getByText(model.value)).toBeInTheDocument();
    });
  });

  it("calls context functions and navigates when featured model is clicked", async () => {
    renderWithClient(<Hero />);
    const model = FEATURED_MODELS.find((m) => m.value === "Civic");
    expect(model).toBeDefined();

    const icon = screen.getByText("Civic");
    fireEvent.click(icon);

    await waitFor(() => {
      expect(setMainSearchMock).toHaveBeenCalled();
      expect(setStagedSearchMock).toHaveBeenCalled();
      expect(setSearchParamsMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalled();
    });
  });
  it("renders the search tabs and default selection", () => {
    renderWithClient(<Hero />);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Used")).toBeInTheDocument();

    expect(screen.getByText("All")).toBeInTheDocument();
  });
});
