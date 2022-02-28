/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 12:39:07
 * @FilePath: \react-lesson-20\src\app.config.ts
 * @LastEditTime: 2022-02-28 10:56:07
 * @LastEditors: Derek Xu
 */
import { useGlobalIconFont } from './components/iconfont/helper'

export default {
  pages: [
    'pages/aboutme/index',
    'pages/contactmanager/index',
    'pages/index/index',
    'pages/messagemanager/index',
    'pages/messagedetail/index',
    'pages/login/index',
    'pages/memberinfo/index',
    'pages/membermodifypassword/index',
    'pages/memberbindphone/index',
    'pages/memberbindusername/index',
    'pages/memberregister/index',
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
    'pages/customerservice/index',
    'pages/groupmanager/index',
    'pages/groupcreate/index',
    'pages/groupsearch/index',
    'pages/groupapply/index'
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
        iconPath: 'assets/icon/index.png',
        selectedIconPath: 'assets/icon/index_focus.png'
      },
      {
        pagePath: 'pages/contactmanager/index',
        text: '联系人',
        iconPath: 'assets/icon/discovery.png',
        selectedIconPath: 'assets/icon/discovery_focus.png'
      },
      {
        pagePath: 'pages/messagemanager/index',
        text: '消息',
        iconPath: 'assets/icon/chat.png',
        selectedIconPath: 'assets/icon/chat_focus.png'
      },
      {
        pagePath: 'pages/aboutme/index',
        text: '我的',
        iconPath: 'assets/icon/burger.png',
        selectedIconPath: 'assets/icon/burger_focus.png'
      }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '楚日历需获取您的地理位置'
    }
  },
  // eslint-disable-next-line react-hooks/rules-of-hooks
  usingComponents: Object.assign(useGlobalIconFont())
}
