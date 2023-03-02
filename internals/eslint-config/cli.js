module.exports = {
  extends: require.resolve('./index.js'),
  env: {
    node: true
  },
  rules: {
    'functional/functional-parameters': 'off',
    'functional/immutable-data': 'off',
    'functional/no-classes': 'off',
    'functional/no-expression-statements': 'off',
    'functional/no-return-void': 'off',
    'functional/prefer-immutable-types': 'off',
    'functional/no-this-expressions': 'off'
  }
}
