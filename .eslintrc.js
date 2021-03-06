module.exports = {
  env: {
    'jest/globals': true,
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['jest', 'prettier'],
  extends: ['eslint:recommended', 'next/core-web-vitals', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};
