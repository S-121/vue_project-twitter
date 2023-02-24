const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  // 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath
  // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/'
  publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  // 输出文件目录：在npm run build时，生成文件的目录名称
  outputDir: `dist-${ process.env.VUE_APP_CURENV }`, // 不同环境输出不同打包目录
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "assets",
  // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  productionSourceMap: false,
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: true,
  // 代码保存时进行eslint检测
  lintOnSave: false,
  // webpack-dev-server 相关配置
  transpileDependencies: [
    "vuetify"
  ],
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false // 是否删除原文件
          })
        ]
      }
    }
  },
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    // host: 'devtest.vog.media',
    host: 'localhost',
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置后自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      // 配置跨域
      '/tweetapi': {
        target: 'https://tweettest.vog.media',
        changeOrigin: true,
      },
      '/vapi': {
        target: 'https://tweettest.vog.media',
        changeOrigin: true,
      },
      '/v1api': {
        target: 'https://tweettest.vog.media',
        changeOrigin: true,

      },
      '/v2api': {
        target: 'https://tweettest.vog.media',
        changeOrigin: true,
      },
      '/v3api': {
        target: 'https://tweettest.vog.media',
        changeOrigin: true,
      },
       '/uapi': {
          target: 'https://uploadtest.vog.media',
          changeOrigin: true,
        },
      '/uploadapi': {
        target: 'http://127.0.0.1:8005',
        changeOrigin: true,
        pathRewrite:{
          '^/uploadapi':'/uapi'
        }
      },
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'cn',
      fallbackLocale: 'cn',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
