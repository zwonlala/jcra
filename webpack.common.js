// const childProcess = require('child_process');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 주의! 구조분해 할당하여 CleanWebpackPlugin 사용하여야 함!
const webpack = require('webpack');

const { version } = require('./package.json');

// const CMD_CLI_LAST_COMMIT = 'git rev-parse --short HEAD';
// const CMD_CLI_AUTHOR = 'git log -1 --pretty=format:"%an"';

/**
 * "development" "production" "none" 중 하나
 */
const mode = process.env.NODE_ENV || 'development';

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  mode,
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.jsx', '.js'], // webpack이 파일 확장자를 읽어내는 순서
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'), // Q. path.resolve() 사용하는 이유?
    publicPath: '/', // 모든 자원(번들 파일, 이미지, 스타일시트 등)이 루트 경로에서 로드됨을 의미
  },
  module: {
    rules: [
      {
        test: /\.(ico|png)$/,
        loader: 'file-loader',
        options: {
          // publicPath: "dist/", // Q. public path가 있으면 정상적으로 동작하지 않는지 모르겠다...
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
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
      banner: `Version: ${version}` + `\nBuild Date: ${new Date().toLocaleString()}`,
      // `\nAuthor: ${childProcess.execSync(CMD_CLI_AUTHOR)}` +
      // `Last Commit: ${childProcess.execSync(CMD_CLI_LAST_COMMIT)}`,
    }),
    new webpack.EnvironmentPlugin([]),
    /**
     * @docs https://github.com/jantimon/html-webpack-plugin#options
     */
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: {
      // 정적 파일을 제공할 경로. defautl 값은 웹팩 아웃풋
      directory: path.resolve(__dirname, 'static'),
      // 브라우져를 통해 접근하는 경로. 기본 값은 "/"
      publicPath: '/',
    },
    // 개발환경에서 도메인을 맞추어야 하는 상황에서 사용.
    // ex) 쿠키 기반의 인증은 인증 서버와 동일한 도메인으로 개발 환경을 맞추어야 함.
    // -> 운영체제의 호스트 파일에 해당 도메인과 127.0.0.1 연결한 뒤 host 속성에 도메인을 설정하여 사용함.
    // host: "dev.domain.com",
    host: 'localhost',
    // 개발 서버 포트 번호 설정. 기본값은 8080
    port: 8081,

    // 히스토리 api를 사용하는 SPA 개발시 설정. 404가 발생하면 index.html로 리다이렉트함.
    historyApiFallback: true,

    devMiddleware: {
      // 메시지 수준을 정할 수 있다. 'none', 'errors-only', 'minimal', 'normal', 'verbose'로 메시지 수준을 조절함
      stats: 'errors-only',
    },

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
