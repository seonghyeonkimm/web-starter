module.exports = {
  src: "./src",
  language: "typescript",
  schema: "./src/graphql/__generated__/schema.graphql",
  exclude: [
    "**/node_modules/**",
    "**/__mocks__/**",
    "**/graphql/**"
  ],
};
