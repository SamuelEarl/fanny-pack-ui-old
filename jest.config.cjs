// Use the JavaScript async function version of this config file (https://jestjs.io/docs/configuration) until the TypeScript issues get resolved (https://github.com/facebook/jest/issues/11453).
module.exports = async () => {
  return {
    modulePaths: [ "<rootDir>" ],
    moduleNameMapper: {
      "^[\$]/(.*)$": "<rootDir>/src/$1",
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["jest-extended", "@testing-library/jest-dom/extend-expect"],
    testMatch: [ "**/_tests_/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
    verbose: true,
    transform: {
      "^.+\\.svelte$": [
        "svelte-jester",
        {
          "preprocess": true
        }
      ],
      "^.+\\.ts$": "ts-jest",
    },
    moduleFileExtensions: ["js", "ts", "svelte"],
  };
};
