/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-07-23 12:39:07
 * @LastEditTime: 2022-01-19 10:19:02
 * @LastEditors: Derek Xu
 */

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    SERVICE_URL: JSON.stringify('http://s1.nsloop.com:22060'),
    H5_CLIENT_INFO: JSON.stringify({
      CLIENT_ID: 'app_id',
      CLIENT_SECURITY: 'Wechat!@#Auth~!@'
    }),

    WEAPP_CLIENT_INFO: JSON.stringify({
      CLIENT_ID: 'wechat_id',
      CLIENT_SECURITY: 'Wechat!@#Auth~!@'
    })
  },
  mini: {},
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
