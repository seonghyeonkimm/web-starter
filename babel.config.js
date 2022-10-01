module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "relay",
      {
        "artifactDirectory": "./src/graphql/__generated__"
      }
    ]
  ]
}