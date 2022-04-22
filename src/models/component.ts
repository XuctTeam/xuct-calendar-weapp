/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-01-16 09:51:32
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-22 11:26:45
 */
export default {
  namespace: 'component',
  state: {
    refreshTime: null
  },

  effects: {
    *removeAllSync({}, { put }) {
      yield put({
        type: 'removeAll'
      })
    }
  },

  reducers: {
    refreshTime(state, { payload }) {
      return { ...state, refreshTime: payload }
    },

    /**
     * @description: 清除所有
     * @param {*} state
     * @return {*}
     */
    removeAll(state, {}) {
      return { ...state, refreshTime: null }
    }
  }
}
