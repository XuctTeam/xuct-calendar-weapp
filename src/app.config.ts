/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 12:39:07
 * @FilePath: \xuct-calendar-weapp\src\app.config.ts
 * @LastEditTime: 2022-05-25 09:41:28
 * @LastEditors: Derek Xu
 */
import { useGlobalIconFont } from './components/iconfont/helper'

export default {
  pages: [
    'pages/membermine/index',
    'pages/contactmanager/index',
    'pages/index/index',
    'pages/messagemanager/index',
    'pages/messagedetail/index',
    'pages/login/index',

    'pages/calendarcreate/index',
    'pages/calendarmanager/index',
    'pages/componentcreate/index',
    'pages/componentview/index',
    'pages/componentlocation/index',
    'pages/componentdesc/index',
    'pages/componentrepeat/index',
    'pages/componentcustrepeat/index',
    'pages/componentshareview/index',

    'pages/componentalarm/index',
    'pages/componentsearch/index',
    'pages/componentmembers/index',
    'pages/componentmembersview/index',
    'pages/groupmanager/index',
    'pages/groupcreate/index',
    'pages/groupsearch/index',
    'pages/groupapply/index',
    'pages/groupmembermanager/index',
    'pages/memberinfo/index',
    'pages/membermodifypassword/index',
    'pages/memberbindphone/index',
    'pages/memberbindusername/index',
    'pages/memberregister/index',
    'pages/memberforgetpassword/index',
    'pages/memberbindemail/index',
    'pages/memberbindwechat/index',
    'pages/memberaccountmerge/index',
    'pages/selfprivacy/index',
    'pages/systemsetting/index',
    'pages/customerservice/index',

    'pages/aboutus/index'
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
        text: '通讯录',
        iconPath: 'assets/icon/group.png',
        selectedIconPath: 'assets/icon/group_focus.png'
      },
      {
        pagePath: 'pages/messagemanager/index',
        text: '消息',
        iconPath: 'assets/icon/message.png',
        selectedIconPath: 'assets/icon/message_focus.png'
      },
      {
        pagePath: 'pages/membermine/index',
        text: '我的',
        iconPath: 'assets/icon/mine.png',
        selectedIconPath: 'assets/icon/mine_focus.png'
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
