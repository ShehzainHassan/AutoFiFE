import { render } from "@testing-library/react";
import Select from "react-select";
import CustomDropdownIndicator from "./dropdown-indicator";
import "@testing-library/jest-dom";

const options = [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" },
];

describe("CustomDropdownIndicator", () => {
  it("renders custom dropdown indicator", () => {
    const { container } = render(
      <Select
        options={options}
        defaultValue={options[0]}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
    );

    const expandElement = container.querySelector(".expand");
    expect(expandElement).toBeInTheDocument();
  });
});
