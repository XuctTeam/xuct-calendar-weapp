/* eslint-disable import/no-commonjs */
/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-07-23 12:39:07
 * @LastEditTime: 2022-04-12 15:36:12
 * @LastEditors: Derek Xu
 */
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
      /* 请求地址 */
      SERVICES_API: JSON.stringify('http://s10.nsloop.com:22060'),
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
  // 小程序端专用配置
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 10240 // 文件大小限制
          }
        }
      }
    }
  }
}
