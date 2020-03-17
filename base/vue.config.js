module.exports = {
  // 部署应用时的基本 URL
  outputDir: '../docs',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    disableHostCheck: true,
    open: process.platform === 'darwin',
    host: '192.168.31.64', //host: '192.168.31.64  192.168.0.138',
    port: 8991,
    // https: false,
    // hotOnly: false,
    // proxy: null, // 设置代理
    proxy: {
      //配置跨域
      '/api': {
        target: "http://tbk.maitomweb.com/api",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};