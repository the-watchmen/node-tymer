module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  env: {
    es6: true
  },
  ecmaFeatures: {
    modules: true
  },
  plugins: ['prettier'],
  rules: {
    'unicorn/no-abusive-eslint-disable': 'off',
    'import/no-unassigned-import': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        bracketSpacing: false,
        printWidth: 100
      }
    ]
  }
}
