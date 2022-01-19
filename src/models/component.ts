/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-01-16 09:51:32
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-01-16 10:11:38
 */
export default {
  namespace: 'component',
  state: {
    refreshTime: null
  },
  reducers: {
    refreshTime(state, { payload }) {
      return { ...state, refreshTime: payload }
    }
  }
}
