module.exports = {
  extends: [
    require.resolve('./base'),
    'plugin:@typescript-eslint/eslint-recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
    ecmaFeatures: { jsx: true },
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
  },
}
