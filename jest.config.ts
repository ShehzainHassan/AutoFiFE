import nextJest from "next/jest";
import type { Config } from "@jest/types";

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig: Config.InitialOptions = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|webp|svg|eot|ttf|woff|woff2)$":
      "<rootDir>/__mocks__/fileMock.js",
    "^swiper/react$": "<rootDir>/__mocks__/swiperReactMock.js",
    "^swiper/css$": "<rootDir>/__mocks__/styleMock.js",
  },
  transformIgnorePatterns: ["node_modules/(?!(swiper|ssr-window|dom7)/)"],
};

export default createJestConfig(customJestConfig);
