module.exports = {
  src: "./src",
  language: "typescript",
  schema: "./src/graphql/schema.graphql",
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/graphql/**"],
  artifactDirectory: "./src/graphql/__generated__",
};
