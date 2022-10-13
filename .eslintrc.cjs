module.exports = {
  env: {
    "jest/globals": true,
  },
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort", "import"],
  root: true,
  rules: {
    // base rules
    "no-console": "warn",

    // import rules
    "@typescript-eslint/consistent-type-imports": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Side effect imports
          ["^\\u0000"],
          // Packages. 'react' related packages come first.
          ["^react", "^\\w", "^@"],
          // Aliases imports.
          ["^src"],
          // Relative imports. Put same-folder imports first and parent imports last.
          ["^\\.", "^\\.\\."],
          // SVG icons
          ["^.+\\.svg$"],
          // json files
          ["^.+\\.json$"],
          // Style imports.
          ["^.+\\.css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
};
