import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, ...rest }) => {
    return <img {...rest} />;
  },
}));
