// Configure Babel with a .cjs file extension for now: https://stackoverflow.com/a/61948485.

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
};
