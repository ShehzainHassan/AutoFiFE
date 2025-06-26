import { screen, fireEvent, waitFor } from "@testing-library/react";
import HandleShare from "./handle-share";
import { renderWithClient } from "@/test-utils/render-with-client";
import useTracking from "@/hooks/useTracking";
import { useParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn().mockResolvedValue(undefined),
    },
  });
});

describe("HandleShare", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useTracking as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });

    (useParams as jest.Mock).mockReturnValue({ id: "42" });
  });

  it("copies URL and shows modal on click", async () => {
    renderWithClient(<HandleShare />);

    const shareButton = screen.getByAltText("share");
    fireEvent.click(shareButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      window.location.href
    );

    await waitFor(() => {
      expect(screen.getByText("URL Copied!")).toBeInTheDocument();
    });

    expect(mockMutate).toHaveBeenCalledWith({
      vehicleId: 42,
      interactionType: "share",
    });
  });

  it("closes the modal when close button is clicked", async () => {
    renderWithClient(<HandleShare />);

    const shareButton = screen.getByAltText("share");
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(screen.getByText("URL Copied!")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("URL Copied!")).not.toBeInTheDocument();
    });
  });
});
