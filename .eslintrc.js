// @ts-check

/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    /**
     * eslint 와 prettier에 중복되는 규칙이 존재함.
     * 따라서 한쪽의 설정을 꺼야하는데,
     * eslint-config-prettier를 extends 하면 중복되는 ESLint 규칙을 비활성화 함.
     */
    'eslint-config-prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/no-default-export': 'warn',
  },
};
