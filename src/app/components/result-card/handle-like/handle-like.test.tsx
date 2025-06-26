import { render, screen, fireEvent } from "@testing-library/react";
import HandleLike from "./handle-like";
import { useUserFavorites } from "@/contexts/user-favorites-context/user-favorites-context";
import useAddUserLike from "@/hooks/useAddUserLike";
import useDeleteUserLike from "@/hooks/useDeleteUserLike";
import useTracking from "@/hooks/useTracking";
import { toast } from "react-toastify";

// Mocks
jest.mock("@/contexts/user-favorites-context/user-favorites-context", () => ({
  useUserFavorites: jest.fn(),
}));

jest.mock("@/hooks/useAddUserLike", () => jest.fn());
jest.mock("@/hooks/useDeleteUserLike", () => jest.fn());
jest.mock("@/hooks/useTracking", () => jest.fn());
jest.mock("@/utilities/utilities", () => ({
  getUserIdFromLocalStorage: jest.fn(() => 123),
}));

jest.mock("react-toastify", () => ({
  toast: { error: jest.fn() },
}));

const mockVehicle = {
  id: 1,
  vin: "1234VIN",
  make: "Toyota",
  model: "Corolla",
  year: 2020,
  price: 15000,
  mileage: 30000,
  color: "Blue",
  fuelType: "Gasoline",
  transmission: "Automatic",
  status: "Available",
};

describe("HandleLike", () => {
  let mutateAdd: jest.Mock;
  let mutateDelete: jest.Mock;
  let mutateTrack: jest.Mock;

  beforeEach(() => {
    mutateAdd = jest.fn();
    mutateDelete = jest.fn();
    mutateTrack = jest.fn();

    (useAddUserLike as jest.Mock).mockReturnValue({ mutate: mutateAdd });
    (useDeleteUserLike as jest.Mock).mockReturnValue({ mutate: mutateDelete });
    (useTracking as jest.Mock).mockReturnValue({ mutate: mutateTrack });

    // Simulate user already liked the vehicle
    (useUserFavorites as jest.Mock).mockReturnValue({
      userLikes: ["1234VIN"],
    });

    // Setup localStorage
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === "authData") return JSON.stringify({ token: "abc123" });
      return null;
    });
  });

  it("renders liked icon if vehicle is in userLikes", () => {
    render(<HandleLike vehicle={mockVehicle} />);
    expect(screen.getByTestId("FavoriteIcon")).toBeInTheDocument();
  });

  it("shows toast if user is not signed in", () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    render(<HandleLike vehicle={mockVehicle} />);
    fireEvent.click(screen.getByTestId("like-button"));
    expect(toast.error).toHaveBeenCalledWith(
      "Please sign in to like a vehicle"
    );
  });

  it("calls addLike and tracking when liking a vehicle", () => {
    // Simulate vehicle not yet liked
    (useUserFavorites as jest.Mock).mockReturnValue({
      userLikes: [],
    });

    render(<HandleLike vehicle={mockVehicle} />);
    fireEvent.click(screen.getByTestId("like-button"));

    expect(mutateAdd).toHaveBeenCalledWith(
      { userId: 123, vin: "1234VIN" },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      })
    );
  });

  it("calls deleteLike and tracking when unliking a vehicle", () => {
    // Simulate already liked
    (useUserFavorites as jest.Mock).mockReturnValue({
      userLikes: ["1234VIN"],
    });

    render(<HandleLike vehicle={mockVehicle} />);
    fireEvent.click(screen.getByTestId("like-button"));

    expect(mutateDelete).toHaveBeenCalledWith(
      { userId: 123, vin: "1234VIN" },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      })
    );
  });
});
