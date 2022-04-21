/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-01-12 15:50:08
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-21 13:53:46
 */
import { actionTypes } from './actionTypes'

export const action = {
  listSync(payload) {
    return {
      type: actionTypes.LIST_SYNC,
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
