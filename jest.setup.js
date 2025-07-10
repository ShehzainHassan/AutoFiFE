import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    const { alt, ...rest } = props;
    return <img alt={alt} {...rest} />;
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
jest.mock("@/hooks/useTracking", () => jest.fn());

jest.mock("next/dynamic", () => {
  return (importFn) => {
    importFn().then(() => {});
    return () => null;
  };
});
