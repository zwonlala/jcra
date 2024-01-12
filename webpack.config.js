const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 주의! 구조분해 할당하여 CleanWebpackPlugin 사용하여야 함!
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { version } = require("./package.json");
const CMD_CLI_LAST_COMMIT = "git rev-parse --short HEAD";
const CMD_CLI_AUTHOR = "git config user.name";

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
                test: /\.css$/,
                use: [
                    /**
                     * - production 환경의 경우
                     * 하단의 MiniCssExtractPlugin를 통해 별도의 css 파일로 추출되게 적용하였으므로,
                     * 별도의 로더(MiniCssExtractPlugin.loader) 적용
                     *
                     * - non-production 환경의 경우
                     * css-loader에 의해 자바스크립트 모듈로 변경된 스타일시트를 적용하기 위해 style-loader 적용
                     */
                    process.env.NODE_ENV === "production"
                        ? MiniCssExtractPlugin.loader
                        : "style-loader",
                    "css-loader",
                ], // 역순으로 적용되어, 뒤에서부터 "css-loader" -> "style-loader" 적용되어야 함
            },
            {
                test: /\.(ico|svg|png)$/,
                loader: "file-loader",
                options: {
                    // publicPath: "dist/", // Q. public path가 있으면 정상적으로 동작하지 않는지 모르겠다...
                    name: "[name].[ext]?[hash]",
                },
            },
            {
                test: /\.png$/,
                loader: "url-loader",
                options: {
                    publicPath: "./dist/",
                    name: "[name].[ext]?[hash]",
                    limit: 5000, // 5kb 미만 파일만 data url로 처리
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // nodue_module 내 사용하는 서드 파티 라이브러리의 .js 파일을 로더가 처리하지 않게 처리
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner:
                `Version: ${version}` +
                `\nBuild Date: ${new Date().toLocaleString()}` +
                `\nAuthor: ${childProcess.execSync(CMD_CLI_AUTHOR)}` +
                `Last Commit: ${childProcess.execSync(CMD_CLI_LAST_COMMIT)}`,
        }),
        new webpack.EnvironmentPlugin([]),
        /**
         * @docs https://github.com/jantimon/html-webpack-plugin#options
         */
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            minify:
                process.env.NODE_ENV === "production"
                    ? {
                          collapseWhitespace: true, // 빈칸 제거
                          removeComments: true, // 주석 제거
                      }
                    : false,
            hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가함.
        }),
        new CleanWebpackPlugin(),
        ...(process.env.NODE_ENV === "production"
            ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
            : []),
    ],
};
