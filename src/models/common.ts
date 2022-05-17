/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 13:12:22
 * @FilePath: \xuct-calendar-weapp\src\models\common.ts
 * @LastEditTime: 2022-05-12 13:20:59
 * @LastEditors: Derek Xu
 */
import Taro from '@tarojs/taro'

export default {
  namespace: 'common', // 这是模块名
  state: {
    // 初始化数据
    accessToken: Taro.getStorageSync('accessToken') || '',
    refreshToken: Taro.getStorageSync('refreshToken') || '',
    userInfo: Taro.getStorageSync('userInfo') || null,
    auths: Taro.getStorageSync('auths') || [],
    lunar: Taro.getStorageSync('lunar') || false,
    monday: Taro.getStorageSync('monday') || false
  },

  effects: {
    /**
     * 异步保存至缓存
     *
     * @param param0
     * @param param1
     */
    *saveStorageSync({ payload, cb }, { call, put }) {
      for (let index = 0; index < Object.keys(payload).length; index++) {
        yield call(Taro.setStorage, {
          key: Object.keys(payload)[index],
          data: payload[Object.keys(payload)[index]]
        })
      }
      cb && cb()
      yield put({
        type: 'save', // 方法名
        payload // 参数
      })
    },

    /**
     * 清除缓存 异步清除缓存
     * @param param0
     * @param param1
     */
    *removeStoreSync({ payload, cb }, { call, put }) {
      for (let index = 0; index < Object.keys(payload).length; index++) {
        yield call(Taro.removeStorage, {
          key: Object.keys(payload)[index]
        })
      }
      cb && cb()
      yield put({
        type: 'remove',
        payload
      })
    },

    *logoutSync({ payload }, { call, put }) {
      const { resolve } = payload || {}
      yield call(Taro.clearStorage)
      yield put({ type: 'calendar/removeAllSync', payload: {} })
      yield put({ type: 'component/removeAllSync', payload: {} })
      yield put({ type: 'logout', payload: { resolve } || {} })
    }
  },

  reducers: {
    // 同步方法
    save(state, { payload }) {
      return { ...state, ...payload }
    },

    remove(state, { payload }) {
      return { ...state, ...payload }
    },

    /**
     * @description: 退出
     * @param {*} state
     * @param {*} param2
     * @return {*}
     */
    logout(state, { payload }) {
      const { resolve } = payload
      !!resolve && resolve()
      return {
        ...state,
        ...{
          accessToken: null,
          refreshToken: null,
          userInfo: null,
          auths: null,
          lunar: false
        }
      }
    }
  }
}
