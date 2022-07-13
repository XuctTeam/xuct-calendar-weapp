/*
 * @Author: Derek Xu
 * @Date: 2022-07-13 17:55:21
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-13 17:57:22
 * @FilePath: \xuct-calendar-weapp\src\utils\taro\useWxBrowser\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
function useWxBrowser(): boolean {
  if (/(micromessenger)/i.test(navigator.userAgent)) {
    //是否电脑微信或者微信开发者工具
    if (/(WindowsWechat)/i.test(navigator.userAgent) || /(wechatdevtools)/i.test(navigator.userAgent)) {
      return true
    } else {
      //手机微信打开的浏览器
      return true
    }
  } else {
    console.log('normal')
    return false
  }
}

export default useWxBrowser
