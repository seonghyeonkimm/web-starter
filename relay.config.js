module.exports = {
  src: "./src",
  language: "typescript",
  schema: "./src/graphql/__generated__/schema.graphql",
  exclude: ["**/node_modules/**", "**/relay/**", "**/graphql/**"],
  artifactDirectory: "./src/relay/__generated__",
};
