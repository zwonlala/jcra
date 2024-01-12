module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    chrome: "79", // chrome 79 버젼까지 지원
                    ie: "11", // ie 11 버젼까지 지원ㅜ
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