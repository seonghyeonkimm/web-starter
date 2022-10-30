module.exports = {
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
  overrides: [
    {
      env: {
        "jest/globals": true,
      },
      files: ["*.test.ts", "*.test.tsx"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",

        // react-testing-library uses find* methods to assert
        "jest/expect-expect": "off",
      },
    },
  ],
};
