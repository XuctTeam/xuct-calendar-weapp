/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-26 10:50:22
 * @LastEditTime: 2022-07-13 17:56:46
 * @LastEditors: Derek Xu
 */
import Taro from '@tarojs/taro'
import dva from '@/utils/dva'
import Router, { NavigateType } from 'tarojs-router-next'
import useWebEnv from './useWebEnv'
import useBack from './useBack'
import useWxBrowser from './useWxBrowser'

export interface ToastOption {
  title: string
  duration?: number
  icon?: 'success' | 'loading' | 'error' | 'none'
  image?: string
  mask?: boolean
}

export interface BackOption {
  to: number
  data?: any
  delta?: number
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
const storage = (key: string): any => {
  var value = Taro.getStorageSync(key)
  return value ? value : null
}

/**
 * 封装toash方法
 * @param toastOption
 */
const toast = (toastOption: ToastOption) => {
  const options = Object.assign({ icon: 'error' }, toastOption)
  Taro.showToast({ ...(options as ToastOption) })
}

/**
 * 封装后退方法
 * @param backOption
 * @returns
 */
const back = (backOption: BackOption): Promise<TaroGeneral.CallbackResult> => {
  try {
    if (!backOption.delta) {
      return Router.back(backOption.data ? backOption.data : {})
    }
    return Router.back(backOption.data ? backOption.data : {}, { delta: backOption.delta })
  } catch (err) {
    console.log(err)
    switch (backOption.to) {
      case 2:
        return Router.toContactmanager({ type: NavigateType.switchTab })
      case 3:
        return Router.toMessagemanager({ type: NavigateType.switchTab })
      case 4:
        if (backOption.data && backOption.data.isLogin) {
          return Router.navigate({ url: '/pages/membermine/index' }, { type: NavigateType.redirectTo })
        }
        return Router.toMembermine({ type: NavigateType.switchTab })
      case 5:
        return Router.navigate({ url: '/pages/componentview/index' }, { type: NavigateType.redirectTo, params: backOption.data })
      case 6:
        return Router.navigate({ url: '/pages/login/index' }, { type: NavigateType.redirectTo })
      default:
        return Router.toIndex({ type: NavigateType.switchTab })
    }
  }
}

export { back, toast, storage, useBack, useWebEnv, useWxBrowser }
