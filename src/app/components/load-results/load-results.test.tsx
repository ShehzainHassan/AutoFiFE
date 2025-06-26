import { render, screen } from "@testing-library/react";
import LoadResults from "./load-results";

jest.mock("@/hooks/useSearchVehicles", () => jest.fn());
jest.mock("@/contexts/car-search-context/car-search-context", () => ({
  useSearch: () => ({
    searchParams: {},
  }),
}));

jest.mock("../result-card/result-card", () => {
  type Vehicle = { make?: string; model?: string };
  const MockResultCard = ({ vehicle }: { vehicle?: Vehicle }) => (
    <div data-testid="result-card">
      {vehicle?.make} {vehicle?.model}
    </div>
  );
  MockResultCard.displayName = "MockResultCard";
  return MockResultCard;
});

jest.mock("@mui/material", () => {
  const actual = jest.requireActual("@mui/material");
  return {
    ...actual,
    CircularProgress: () => <div data-testid="loading-spinner">Loading...</div>,
  };
});

jest.mock("react-toastify", () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
}));

jest.mock("../empty-state/empty-state", () => {
  type EmptyStateProps = { message: string };
  function MockEmptyState({ message }: EmptyStateProps) {
    return <div data-testid="empty-state">{message}</div>;
  }
  MockEmptyState.displayName = "MockEmptyState";
  return MockEmptyState;
});

jest.mock("../error-message/error-message", () => {
  const MockErrorMessage = ({ message }: { message: string }) => (
    <div data-testid="error-message">{message}</div>
  );
  MockErrorMessage.displayName = "MockErrorMessage";
  return MockErrorMessage;
});

import useSearchVehicles from "@/hooks/useSearchVehicles";

const mockedUseSearchVehicles = useSearchVehicles as jest.Mock;

describe("LoadResults", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading spinner", () => {
    mockedUseSearchVehicles.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<LoadResults />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error message on error", () => {
    mockedUseSearchVehicles.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: "Something went wrong" },
    });

    render(<LoadResults />);
    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Something went wrong"
    );
  });

  it("renders empty state when no data", () => {
    mockedUseSearchVehicles.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<LoadResults />);
    expect(screen.getByTestId("empty-state")).toHaveTextContent(
      "No vehicles found"
    );
  });

  it("renders result cards when data is available", () => {
    mockedUseSearchVehicles.mockReturnValue({
      data: [
        { id: 1, make: "Toyota", model: "Corolla" },
        { id: 2, make: "Honda", model: "Civic" },
      ],
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<LoadResults />);
    const cards = screen.getAllByTestId("result-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Toyota Corolla");
    expect(cards[1]).toHaveTextContent("Honda Civic");
    expect(screen.getByTestId("toast-container")).toBeInTheDocument();
  });
});
