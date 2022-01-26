/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 12:39:07
 * @FilePath: \react-lesson-20\src\app.config.ts
 * @LastEditTime: 2022-01-26 14:27:14
 * @LastEditors: Derek Xu
 */
import { useGlobalIconFont } from './components/iconfont/helper'

export default {
  pages: [
    'pages/index/index',
    'pages/aboutme/index',
    'pages/notice/index',
    'pages/login/index',
    'pages/userinfo/index',
    'pages/bindphone/index',
    'pages/bindusername/index',
    'pages/modifypassword/index',
    'pages/calendarcreate/index',
    'pages/calendarmanager/index',
    'pages/componentcreate/index',
    'pages/componentlocation/index',
    'pages/componentdesc/index',
    'pages/componentrepeat/index',
    'pages/componentcustrepeat/index',
    'pages/componentalarm/index',
    'pages/componentview/index',
    'pages/componentsearch/index',
    'pages/selfprivacy/index',
    'pages/systemsetting/index',
    'pages/customerservice/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '日程',
        iconPath: 'assets/icon/index_gray.png',
        selectedIconPath: 'assets/icon/index_active.png'
      },
      // {
      //   pagePath: 'pages/logs/index',
      //   text: '日志'
      // },
      {
        pagePath: 'pages/aboutme/index',
        text: '我的',
        iconPath: 'assets/icon/my_gray.png',
        selectedIconPath: 'assets/icon/my_active.png'
      }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '楚日历获取您的地理位置'
    }
  },
  // eslint-disable-next-line react-hooks/rules-of-hooks
  usingComponents: Object.assign(useGlobalIconFont())
}
