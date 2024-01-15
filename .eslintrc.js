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
    'import/no-extraneous-dependencies': 'off',
    'import/order': [
      'error', // 해당 규칙을 위반할 경우 error 로 처리
      {
        //  'builtin', 'external', 'internal' 세 그룹으로 분리
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],

        // 패턴을 통해서 그룹을 생성.
        // path에 'react'가 들어있다면, external 그룹으로 지정하고, 제일 위에(before) 위치
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        // alphabetize: 그룹에 속한 import 구문들을 알바벳 오름차순 정렬
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        // 'newlines-between': 그룹과 그룹 사이에 new line을 추가
        'newlines-between': 'always',
      },
    ],
  },
};
