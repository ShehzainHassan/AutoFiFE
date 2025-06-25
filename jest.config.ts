import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const jestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  transformIgnorePatterns: ["/node_modules/(?!(swiper|ssr-window|dom7)/)"],
};

export default createJestConfig(jestConfig);
