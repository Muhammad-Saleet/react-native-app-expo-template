module.exports = {
    env: { node: true },
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: { ecmaFeatures: { jsx: true } },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    rules: {
        "jsx-quotes": "error",
        "no-duplicate-imports": "error",
        indent: "error",
        "comma-dangle": ["error", "always-multiline"],
        "object-shorthand": "error",
        "object-curly-spacing": ["error", "always"],
        "object-curly-newline":  ["error", { multiline: true }],
        "object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "quote-props": ["error", "as-needed"],
        semi: ["error", "never", { beforeStatementContinuationChars: "always" }],
        "array-bracket-newline": ["error", { multiline: true }],
        "array-element-newline": ["error", "consistent"],
        "no-multi-spaces": "error",
        "no-tabs": "error",
        "no-multiple-empty-lines": ["error", { max: 1 }],
        "no-trailing-spaces": "error",
        "require-await": "warn",
        "arrow-parens": ["error", "always"],
    },
}
