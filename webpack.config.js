const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 주의! 구조분해 할당하여 CleanWebpackPlugin 사용하여야 함!
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { version } = require('./package.json');

const CMD_CLI_LAST_COMMIT = 'git rev-parse --short HEAD';
const CMD_CLI_AUTHOR = 'git config user.name';

module.exports = {
  mode: 'development', // "development" "production" "none"
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.jsx', '.js'], // webpack이 파일 확장자를 읽어내는 순서
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'), // Q. path.resolve() 사용하는 이유?
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
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ], // 역순으로 적용되어, 뒤에서부터 "css-loader" -> "style-loader" 적용되어야 함
      },
      {
        test: /\.(ico|svg|png)$/,
        loader: 'file-loader',
        options: {
          // publicPath: "dist/", // Q. public path가 있으면 정상적으로 동작하지 않는지 모르겠다...
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 5000, // 5kb 미만 파일만 data url로 처리
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // nodue_module 내 사용하는 서드 파티 라이브러리의 .js 파일을 로더가 처리하지 않게 처리
        loader: 'babel-loader',
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
      template: './public/index.html',
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
      hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가함.
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production' ? [new MiniCssExtractPlugin({ filename: '[name].css' })] : []),
  ],
  devServer: {
    // 정적 파일을 제공할 경로. defautl 값은 웹팩 아웃풋
    contentBase: path.join(__dirname, 'dist'),
    // 브라우져를 통해 접근하는 경로. 기본 값은 "/"
    publicPath: '/',
    // 개발환경에서 도메인을 맞추어야 하는 상황에서 사용.
    // ex) 쿠키 기반의 인증은 인증 서버와 동일한 도메인으로 개발 환경을 맞추어야 함.
    // -> 운영체제의 호스트 파일에 해당 도메인과 127.0.0.1 연결한 뒤 host 속성에 도메인을 설정하여 사용함.
    // host: "dev.domain.com",
    host: 'localhost',
    // 빌드시 에러나 경고를 브라우져 화면에 표시함
    overlay: true,
    // 개발 서버 포트 번호 설정. 기본값은 8080
    port: 8081,
    // 메시지 수준을 정할 수 있다. 'none', 'errors-only', 'minimal', 'normal', 'verbose'로 메시지 수준을 조절함
    stats: 'errors-only',
    // 히스토리 api를 사용하는 SPA 개발시 설정. 404가 발생하면 index.html로 리다이렉트함.
    historyApiFallback: true,

    // 서버가 시작된 후 브라우져를 열도록 dev-server에 지시
    open: true,
    // Webpack의 Hot Module Replacement 기능을 활성화
    hot: true,
    //
    client: {
      // 컴파일러 오류 또는 경고가 있는 경우 브라우저에 전체 화면 오버레이로 표시함
      // overlay: true,
      overlay: {
        errors: true, // 컴파일 오류
        warnings: false, // 컴파일 경고
        runtimeErrors: true, // 처리되지 않은 런타임 오류
      },
    },
  },
};
