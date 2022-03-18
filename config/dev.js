/* eslint-disable import/no-commonjs */
/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-07-23 12:39:07
 * @LastEditTime: 2022-03-18 09:44:10
 * @LastEditors: Derek Xu
 */
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    SERVICE_URL: JSON.stringify('http://s1.nsloop.com:22060')
  },
  mini: {
    webpackChain: (chain) => {
      chain.merge({
        optimization: {
          splitChunks: {
            // `all` or `initial`, `all` will have the smallest overall size, refer to
            // https://stackoverflow.com/questions/50127185/webpack-what-is-the-difference-between-all-and-initial-options-in-optimizat
            chunks: 'all',
            cacheGroups: {
              lodash: {
                name: 'lodash',
                priority: 100,
                test(module) {
                  return /node_modules[\\/]lodash/.test(module.context)
                }
              },

              taroify: {
                name: 'taroify',
                test: /node_modules[\\/]@taroify/,
                // just higher than 10 will be fine, refer to
                // https://github.com/NervJS/taro/blob/bc6af68bda2cbc9163fbda36c15878fc96aec8f1/packages/taro-mini-runner/src/webpack/build.conf.ts#L220-L254
                priority: 100
              }
            }
          },
          // turn on below `minimize`, `minimizer` settings if bundle size is way too large
          // to do remote debug in wechatdevtools
          minimize: true,
          minimizer: [
            new TerserPlugin({
              // add those `bundle`s your want to do size reduction
              // refer to https://webpack.js.org/plugins/terser-webpack-plugin/#test
              test: ['common.js', 'taro.js', 'vendors.js', 'lodash.js', 'taroify.js'],
              // minify: TerserPlugin.swcMinify,
              cache: true,
              extractComments: true,
              parallel: true,
              // should work with `mini.sourceMapType='source-map'`
              // refer to https://webpack.js.org/plugins/terser-webpack-plugin/#note-about-source-maps
              sourceMap: true
            })
          ]
        }
      })
    }
  },
  h5: {},
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
