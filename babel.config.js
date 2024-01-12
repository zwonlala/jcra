module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    chrome: "79", // chrome 79 버젼까지 지원
                    ie: "11", // ie 11 버젼까지 지원
                    /**
                     * Q. ie 11도 지원 가능하게 설정하였으나 번들링된 결과물에는 아직 const 와 화살표 표현식이 보임..🤔
                     * 그런데, "npx babel ASFD.js"와 같이 명령어로 확인해보면, const나 화살표 표현식 잘 처리된 것 같아서 뭐지 싶음
                     */
                },

                // 폴리필 속성 추가
                useBuiltIns: "usage", // 폴리필 사용 방식 지정
                corejs: {
                    // 폴리필 버전 지정
                    version: 2,
                },
            },
        ],
        ["@babel/preset-react", { runtime: "automatic" }],
    ],
};