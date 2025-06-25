import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dropdown from "./dropdown";
import "@testing-library/jest-dom";

const options = [
  { label: "Audi", value: "audi" },
  { label: "BMW", value: "bmw" },
];

const setupDropdown = (value = "audi", onChange = jest.fn()) => {
  render(
    <Dropdown value={value} onChange={onChange} placeholder="Select option">
      <Dropdown.Select options={options} />
    </Dropdown>
  );
};

describe("Dropdown component", () => {
  it("renders dropdown with correct initial value", async () => {
    setupDropdown();

    await waitFor(() => {
      expect(screen.getByText("Audi")).toBeInTheDocument();
    });
  });

  it("renders all options on click", async () => {
    setupDropdown();

    await waitFor(() => {
      fireEvent.mouseDown(screen.getByText("Audi"));
    });
    await waitFor(() => {
      expect(screen.getByText("BMW")).toBeInTheDocument();
    });
  });

  it("calls onChange with new value when option selected", async () => {
    const handleChange = jest.fn();
    setupDropdown("audi", handleChange);

    await waitFor(() => {
      fireEvent.mouseDown(screen.getByText("Audi"));
    });

    const bmwOption = await screen.findByText("BMW");
    fireEvent.click(bmwOption);

    expect(handleChange).toHaveBeenCalledWith("bmw");
  });

  it("renders placeholder if no value is selected", () => {
    render(
      <Dropdown value="" onChange={jest.fn()} placeholder="Select option">
        <Dropdown.Select options={options} />
      </Dropdown>
    );

    expect(screen.getByText("Select option")).toBeInTheDocument();
  });

  it("throws error if Dropdown.Select is used outside Dropdown", () => {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() =>
      render(
        <Dropdown.Select options={options} placeholder="Select" className="" />
      )
    ).toThrow("Dropdown.Select must be used inside a Dropdown");

    console.error = originalError;
  });
});
