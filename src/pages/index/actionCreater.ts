/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 14:16:47
 * @FilePath: \react-lesson-20\src\pages\index\model\actionCreater.ts
 * @LastEditTime: 2022-01-16 10:11:30
 * @LastEditors: Derek Xu
 */
import { actionTypes } from './actionTypes'

export const action = {
  listSync() {
    return {
      type: actionTypes.LIST_SYNC
    }
  },
  selected(payload) {
    return {
      type: actionTypes.SELECTED,
      payload
    }
  },

  refreshTime(payload) {
    return {
      type: actionTypes.REFRESH_TIME,
      payload
    }
  }
}
