module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    html: '<html lang="en"></html>',
    url: "http://localhost",
    userAgent: "Agent/007",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
};
