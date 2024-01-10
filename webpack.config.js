const path = require("path");

module.exports = {
    mode: "development", // "development" "production" "none"
    entry: "./src/index.js",
    output: {
        filename: "[name].js",
        path: path.resolve("./dist"), // Q. path.resolve() 사용하는 이유?
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: ["style-loader", "css-loader"], // 역순으로 적용되어, 뒤에서부터 "css-loader" -> "style-loader" 적용되어야 함
            },
            {
                test: /.(ico|svg|png)$/,
                loader: "file-loader",
                options: {
                    publicPath: "./dist",
                    name: "[name].[ext][hash]",
                },
            },
            {
                test: /.png$/,
                loader: "url-loader",
                options: {
                    publicPath: "./dist",
                    name: "[name].[ext][hash]",
                    limit: 5000, // 5kb 미만 파일만 data url로 처리
                },
            },
        ],
    },
};
