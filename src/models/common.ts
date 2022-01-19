/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 13:12:22
 * @FilePath: \react-lesson-20\src\models\common.ts
 * @LastEditTime: 2021-12-20 09:28:37
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
    auths: Taro.getStorageSync('auths') || []
  },

  effects: {
    // 异步方法, 在这里可以用put调用同步的方法
    // generator  这里的方法第二个参数都是{call, put }, call调用异步方法, put 可以调用reducers中的方法
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
     * 清除缓存
     */
    *removeStoreSync({ payload }, { call, put }) {
      for (let index = 0; index < Object.keys(payload).length; index++) {
        yield call(Taro.removeStorage, {
          key: Object.keys(payload)[index]
        })
      }
      yield put({
        type: 'remove',
        payload
      })
    }
  },

  reducers: {
    // 同步方法
    save(state, { payload }) {
      return { ...state, ...payload }
    },

    remove(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
