// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution')

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: 'plugin:unicorn/recommended',
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'unicorn/prefer-top-level-await': 'off'
  }
}
