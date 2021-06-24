module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "standard",
    "plugin:jest/recommended",
    "plugin:json/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    "jest/no-mocks-import": "off",
  },
};
