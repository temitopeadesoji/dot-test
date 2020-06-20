module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended"
    // "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    semi: [2, "always"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "vue/attribute-hyphenation": "off",
    "vue/html-indent": "off",
    "vue/attributes-order": "off",
    "no-unused-labels": "off",
    semi: "off",
    "vue/html-self-closing": "off",
    "no-irregular-whitespace": "off",
    "no-useless-escape": "off"
    // "prettier/prettier": ["error", { semi: true }]
  }
};
