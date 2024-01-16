// @ts-check

/**
 * @type {import ('@babel/core').ConfigFunction}
 */
module.exports = {
  presets: [
    /** @type {import ('@babel/core').PluginItem} */
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '79', // chrome 79 버젼까지 지원
          ie: '11', // ie 11 버젼까지 지원
          /**
           * Q. ie 11도 지원 가능하게 설정하였으나 번들링된 결과물에는 아직 const 와 화살표 표현식이 보임..🤔
           * 그런데, "npx babel ASFD.js"와 같이 명령어로 확인해보면, const나 화살표 표현식 잘 처리된 것 같아서 뭐지 싶음
           */
        },

        /**
         * preset-env 프리셋의 폴리필 삽입 방식을 설정하는 옵션
         *
         * - false 이외의 옵션: 최신 자바스크립트 폴리필이 포함된 standard javascript library인 core-js 모듈을 가져오는(import) 코드를 타깃 브라우저에 맞게 삽입/수정
         *   - "entry" : core-js/stable과 regenerator-runtime/runtime 모듈을 전역 스코프에 직접 삽입한 경우에만 가능.
         *                전체 core-js 삽입문(import)을 corejs 하위 특정 모듈들의 삽입문(import)으로 변경시켜, 타깃 환경에 필요한 폴리필만 전역 스코프에 추가되도록 함
         *   - "usage" : 설정은 실제 사용한 폴리필만 삽입.
         *                import 문 변경이 아닌 삽입이므로 core-js/stable과 regenerator-runtime/runtime 모듈을 전역 스코프에 삽입하지 않아도 됨
         * - false
         */
        useBuiltIns: 'usage', // 폴리필 사용 방식 지정
        /**
         * 해당 옵션은 삽입되는 core-js 모듈의 버전을 설정
         * 주의) useBuiltIns 옵션과 함께 사용해야 함.
         */
        corejs: '3',
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  // plugins: [
  //   ['@babel/plugin-transform-runtime', { corejs: 3 }]
  // ],
};
