import { render, screen, fireEvent } from "@testing-library/react";
import HandleLikeContainer from "./handle-like";
import { toast } from "react-toastify";

type MockHandleLikeProps = {
  handleLike: () => void;
  isLiked: boolean;
};

function MockHandleLike({ handleLike, isLiked }: MockHandleLikeProps) {
  return (
    <button onClick={handleLike} data-testid="like-button">
      {isLiked ? "Unlike" : "Like"}
    </button>
  );
}
MockHandleLike.displayName = "MockHandleLike";

jest.mock("./handle-like", () => MockHandleLike);

const mockMutateAdd = jest.fn();
const mockMutateDelete = jest.fn();
const mockMutateTrack = jest.fn();

jest.mock("@/contexts/user-favorites-context/user-favorites-context", () => ({
  useUserFavorites: () => ({
    userLikes: ["123ABC"],
  }),
}));

jest.mock("@/hooks/useAddUserLike", () => () => ({
  mutate: mockMutateAdd,
}));

jest.mock("@/hooks/useDeleteUserLike", () => () => ({
  mutate: mockMutateDelete,
}));

jest.mock("@/hooks/useTracking", () => () => ({
  mutate: mockMutateTrack,
}));

jest.mock("@/utilities/utilities", () => ({
  getUserIdFromLocalStorage: () => 42,
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("HandleLikeContainer", () => {
  const vehicle = {
    vin: "123ABC",
    id: 1,
    make: "TestMake",
    model: "TestModel",
    year: 2020,
    price: 10000,
    mileage: 5000,
    color: "Red",
    fuelType: "Gasoline",
    transmission: "Automatic",
    status: "NEW",
  };
  const notLikedVehilce = {
    vin: "12345678",
    id: 2,
    make: "TestMake",
    model: "TestModel",
    year: 2020,
    price: 10000,
    mileage: 5000,
    color: "Red",
    fuelType: "Gasoline",
    transmission: "Automatic",
    status: "NEW",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("calls deleteLikeMutation if vehicle is already liked", () => {
    Storage.prototype.getItem = jest.fn(() => "mockAuthToken");
    render(<HandleLikeContainer vehicle={vehicle} />);
    fireEvent.click(screen.getByTestId("like-button"));

    expect(mockMutateDelete).toHaveBeenCalledWith(
      { userId: 42, vin: "123ABC" },
      expect.any(Object)
    );
  });

  it("calls addLikeMutation if vehicle is not liked", () => {
    Storage.prototype.getItem = jest.fn(() => "mockAuthToken");
    render(<HandleLikeContainer vehicle={notLikedVehilce} />);
    fireEvent.click(screen.getByTestId("like-button"));
    expect(mockMutateAdd).toHaveBeenCalledWith(
      { userId: 42, vin: notLikedVehilce.vin },
      expect.any(Object)
    );
  });

  it("shows toast error if user is not logged in", () => {
    Storage.prototype.getItem = jest.fn(() => "");
    render(<HandleLikeContainer vehicle={vehicle} />);
    fireEvent.click(screen.getByTestId("like-button"));
    expect(toast.error).toHaveBeenCalledWith(
      "Please sign in to like a vehicle"
    );
  });

  it("renders button with correct text when not liked", () => {
    Storage.prototype.getItem = jest.fn(() => "mockAuthToken");

    const notLikedVehicle = {
      ...vehicle,
      vin: "NOTLIKED123",
      id: 2,
    };

    render(<HandleLikeContainer vehicle={notLikedVehicle} />);
    expect(screen.getByTestId("like-button")).toHaveTextContent("Like");
  });

  it("renders button with correct text when not liked", () => {
    Storage.prototype.getItem = jest.fn(() => "mockAuthToken");
    render(<HandleLikeContainer vehicle={notLikedVehilce} />);
    expect(screen.getByTestId("like-button")).toHaveTextContent("Like");
  });
});
