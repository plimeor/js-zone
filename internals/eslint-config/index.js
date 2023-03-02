// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution')

module.exports = {
  env: {
    es2022: true
  },
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json'
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unicorn', 'functional'],
  extends: [
    'plugin:unicorn/recommended',
    'plugin:functional/strict',
    'plugin:functional/external-typescript-recommended',
    'plugin:functional/stylistic'
  ],
  ignorePatterns: ['.eslintrc.js']
}
