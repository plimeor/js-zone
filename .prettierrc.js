// Documentation for this file: https://prettier.io/en/configuration.html
module.exports = {
  printWidth: 120,
  endOfLine: 'auto',
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'none',
  semi: false,
  plugins: ['./common/autoinstallers/rush-prettier/node_modules/prettier-plugin-packagejson']
}
