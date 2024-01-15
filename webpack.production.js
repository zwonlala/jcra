const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
             * - production 환경의 경우
             * 하단의 MiniCssExtractPlugin를 통해 별도의 css 파일로 추출되게 적용하였으므로,
             * 별도의 로더(MiniCssExtractPlugin.loader) 적용
             */
            MiniCssExtractPlugin.loader,
            'css-loader',
          ], // 역순으로 적용되어, 뒤에서부터 "css-loader" -> "style-loader" 적용되어야 함
        },
        {
          test: /\.s[ac]ss$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      /**
       * @docs https://github.com/jantimon/html-webpack-plugin#options
       */
      new HtmlWebpackPlugin({
        template: './public/index.html',
        // 'production' 일 경우 minify 옵션 사용
        minify: {
          collapseWhitespace: true, // 'production' 일 경우 빈칸 제거
          removeComments: true, //  'production' 일 경우 주석 제거
        },
        hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가함.
      }),
      // 'production' 일 경우 CSS 파일 최소화
      new MiniCssExtractPlugin({ filename: '[name].css' }),
    ],
    optimization: {
      minimizer: [
        // 자동으로 알아서 'production' 일 경우에만 적용이 된다.
        // 만약 'development' 모드일때도 적용하고싶다면, "minimize: true," 값을 "optimization" object에 추가하면 됨
        new CssMinimizerPlugin(),
        // 'production'인 경우 JS 코드를 난독화
        new TerserPlugin({
          terserOptions: {
            compress: {
              // production 빌드일 경우 console.log() 제거함
              drop_console: true,
            },
          },
        }),
      ],
    },
  });
