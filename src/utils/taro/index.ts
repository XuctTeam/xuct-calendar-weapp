/* eslint-disable react-hooks/rules-of-hooks */
/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-26 10:50:22
 * @LastEditTime: 2022-02-28 21:44:50
 * @LastEditors: Derek Xu
 */
import Taro from '@tarojs/taro'
import dva from '@/utils/dva'
import { Rect, IAppInfo } from '~/../@types/app'
import useWebEnv from './useWebEnv'
import useModal from './useModal'
import useBack from './useBack'
import useToast from './useToast'

/**
 * @name: 初始化系统参数
 * @description:
 * @test: test font
 * @msg:
 * @param {*}
 * @return {*}
 */
export const getSystemInfo = (): IAppInfo => {
  // h5环境下忽略navbar
  let taroSystem: Taro.getSystemInfoSync.Result = Taro.getSystemInfoSync()
  let ios = !!(taroSystem.system && taroSystem.system.toLowerCase().search('ios') + 1)
  let rectInfo = getMenuButtonInfo()
  let rect: Rect
  if (rectInfo instanceof Promise) {
    rectInfo
      .then(() => {})
      .catch((err) => {
        console.log(err)
      })
    let gap = 0 //胶囊按钮上下间距 使导航内容居中
    let width = 96 //胶囊的宽度
    if (taroSystem.platform === 'android') {
      gap = 8
      width = 96
    } else if (taroSystem.platform === 'devtools') {
      if (ios) {
        gap = 5.5 //开发工具中ios手机
      } else {
        gap = 7.5 //开发工具中android和其他手机
      }
    } else {
      gap = 4
      width = 88
    }
    if (!taroSystem.statusBarHeight) {
      //开启wifi的情况下修复statusBarHeight值获取不到
      taroSystem.statusBarHeight = taroSystem.screenHeight - taroSystem.windowHeight + 1
    }
    rect = {
      //获取不到胶囊信息就自定义重置一个
      bottom: taroSystem.statusBarHeight + gap + 32,
      height: 32,
      left: taroSystem.windowWidth - width - 10,
      right: taroSystem.windowWidth - 10,
      top: taroSystem.statusBarHeight + gap,
      width: width
    }
    console.log('rect', rect)
  } else {
    rect = Object.assign({}, rectInfo)
  }
  let navBarExtendHeight: number = 0
  let navBarHeight: number = 0
  if (!taroSystem.statusBarHeight) {
    //开启wifi和打电话下
    taroSystem.statusBarHeight = taroSystem.screenHeight - taroSystem.windowHeight + 1
    navBarHeight = (function () {
      let gap = rect.top - taroSystem.statusBarHeight
      return 2 * gap + rect.height
    })()
    taroSystem.statusBarHeight = 0
    navBarExtendHeight = 0 //下方扩展4像素高度 防止下方边距太小
  } else {
    navBarHeight = (function () {
      let gap = rect.top - taroSystem.statusBarHeight
      return taroSystem.statusBarHeight + 2 * gap + rect.height
    })()
    if (ios) {
      navBarExtendHeight = 4 //下方扩展4像素高度 防止下方边距太小
    } else {
      navBarExtendHeight = 0
    }
  }
  return {
    ios: ios,
    sysInfo: Object.assign({}, taroSystem),
    capsulePosition: Object.assign({}, rect),
    navBarExtendHeight: navBarExtendHeight,
    navBarHeight: navBarHeight
  }
}

const getMenuButtonInfo = (): Rect | null | Promise<any> => {
  try {
    return Taro.getMenuButtonBoundingClientRect()
  } catch (err) {
    console.log(err)
  }
  return null
}

/**
 *
 * @returns 获取当前页
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

/**
 * 重定向首页
 */
export const pageToGoLogin = () => {
  let path = getCurrentPageUrl()
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }
}

/**
 * 清除所有登录信息
 */
export const pageCleanToLogin = () => {
  const dispatch = dva.getDispatch()
  dispatch({
    type: 'common/removeStoreSync',
    payload: {
      accessToken: '',
      refreshToken: '',
      userInfo: null,
      auths: null
    }
  })
  Taro.switchTab({
    url: '/pages/index/index'
  })
}

/**
 *
 * @param key 同步获取缓存数据
 * @returns
 */
export const getStorage = (key: string): any => {
  try {
    var value = Taro.getStorageSync(key)
    if (value) {
      return value
    }
  } catch (e) {
    // Do something when catch error
  }
  return null
}

export { useWebEnv, useBack, useModal, useToast }
