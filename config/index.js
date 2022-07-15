/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-04 09:12:16
 * @LastEditTime: 2022-05-24 17:03:43
 * @LastEditors: Derek Xu
 */
/* eslint-disable import/no-commonjs */
const path = require('path')

const config = {
  projectName: 'calendar-weapp',
  date: '2021-7-23',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html', 'tarojs-router-next-plugin'],
  defineConstants: {
    /* 腾讯地图使用 */
    LOCATION_APIKEY: JSON.stringify('5Y6BZ-LHMWU-HM2VX-45SUU-RDESJ-4VBGR'),

    /* 图片服务器 */
    SERVICES_IMAGES: JSON.stringify('https://images.xuct.net.cn/'),

    /* 客户端认证KEY */
    CLIENT_INFO: JSON.stringify({
      
    }),
    /* 版本信息 */
    VERSION: JSON.stringify({
      date: '2022-01-25',
      version: '1.0.0'
    }),

    WX_TEMPLATE_ID: JSON.stringify({ IDS: ['m3tIRN2yvI2mdFuGHV9mXS0uIHf9oz-u6U51HRHTcLQ'] })
  },
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'react',
  mini: {
    miniCssExtractPluginOption: {
      ignoreOrder: true
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },

    webpackChain(chain) {
      // linaria/loader 选项详见 https://github.com/callstack/linaria/blob/master/docs/BUNDLERS_INTEGRATION.md#webpack
      chain.module
        .rule('script')
        .use('linariaLoader')
        .loader('linaria/loader')
        .options({
          sourceMap: process.env.NODE_ENV !== 'production'
        })

      chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])

      chain.plugin('lodash-webpack-plugin').use(require('lodash-webpack-plugin'), [
        {
          shorthands: true,
          cloning: true,
          caching: true,
          collections: true,
          exotics: true,
          guards: true,
          memoizing: true,
          coercions: true,
          flattening: true,
          paths: true
        }
      ])
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['@taroify'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain) {
      chain.module
        .rule('script')
        .use('linariaLoader')
        .loader('linaria/loader')
        .options({
          sourceMap: process.env.NODE_ENV !== 'production'
        })
    }
  },
  terser: {
    enable: true,
    config: {
      // 配置项同 https://github.com/terser/terser#minify-options
    }
  },
  csso: {
    enable: true,
    config: {
      // 配置项同 https://github.com/css/csso#minifysource-options
    }
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@/pages': path.resolve(__dirname, '..', './src/pages'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants')
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
