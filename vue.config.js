module.exports = {
  publicPath:"/dist",//设置项目根路径
  devServer: {
    open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 9099,
    https: false,
    hotOnly: false,
    proxy: {//设置代理
      '/o2o': {
        target: 'http://127.0.0.1:8080/o2o',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/o2o': ''
        }
      }
    },
  },
}