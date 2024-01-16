const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');
/**
 * @type import('webpack').Configuration
 */
module.exports = () =>
  merge(common, {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            /**
             * - non-production 환경의 경우
             * css-loader에 의해 자바스크립트 모듈로 변경된 스타일시트를 적용하기 위해 style-loader 적용
             */
            'style-loader',
            'css-loader',
          ], // 역순으로 적용되어, 뒤에서부터 "css-loader" -> "style-loader" 적용되어야 함
        },
        {
          test: /\.s[ac]ss$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      /**
       * @docs https://github.com/jantimon/html-webpack-plugin#options
       */
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: false,
        hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가함.
      }),
    ],
    // eval-cheap-source-map과 유사하지만,
    // 이 경우 더 나은 결과를 위해 로더의 소스맵을 사용합니다.
    // 그러나 로더의 소스맵은 라인 당 단일 매핑으로 단순화됩니다
    devtool: 'eval-cheap-module-source-map',
  });
