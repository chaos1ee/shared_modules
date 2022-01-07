module.exports = {
  parser: '@babel/eslint-parser',
  plugins: ['react'],
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: [require.resolve('babel-preset-react-app/prod')],
    },
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-uses-vars': 'warn',
    'react/jsx-uses-react': 'warn',
  },
}
