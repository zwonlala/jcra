const devWebpackConfig = require('./webpack.development');
const prodWebpackConfig = require('./webpack.production');

/**
 * @param {('development' | 'production')}
 * - process.env.NODE_ENV 값은 "development" "production" 중 하나
 * - "none" 값은 사용하지 않음
 */
const mode = process.env.NODE_ENV || 'production';

/**
 * @type import('webpack').Configuration
 */
module.exports = () => {
  console.log('빌드모드: ', mode);
  switch (mode) {
    case 'development':
      return devWebpackConfig();
    case 'production':
      return prodWebpackConfig();
    case 'none':
    default:
      throw new Error('mode(process.env.NODE_ENV) 값이 "none" 혹은 undefind 값입니다.');
  }
};
