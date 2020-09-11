// vue.config.js
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
// 环境变量
const ENV = process.env;
// const IS_PRODUCTION = ENV.NODE_ENV === 'production';

module.exports = {
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  publicPath: '/',
  outputDir: ENV.outputDir,
  // 指定生成的 index.html 的输出路径 (相对于 outputDir) 。也可以是一个绝对路径。
  indexPath: 'index.html',
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,
  // 生产环境的 source map
  productionSourceMap: false,
  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('examples'));
    config.resolve.alias.set('~', resolve('packages'));

    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 移除 preload 插件
    config.plugins.delete('preload');

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改base64限定值
        options.limit = 10000;
        return options;
      });

    config.module
      .rule('js')
      .include.add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options;
      });
  },
  // 开发环境host、port等配置
  devServer: {
    // 端口号
    port: 9090,
    hot: true,
    host: '0.0.0.0',
    https: false,
    // 配置自动启动浏览器
    open: true
  },
  //  webpack插件配置
  configureWebpack: () => {
    return {
      devtool: 'eval-source-map'
    };
  }
};
