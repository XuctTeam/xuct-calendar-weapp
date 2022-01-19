/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-01-12 15:50:08
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-01-16 10:26:50
 */
import { actionTypes } from './actionTypes'

export const action = {
  listSync() {
    return {
      type: actionTypes.LIST_SYNC
    }
  },
  refreshTime(payload) {
    return {
      type: actionTypes.REFRESH_TIME,
      payload
    }
  }
}
