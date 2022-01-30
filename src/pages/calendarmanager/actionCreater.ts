/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-01-12 15:50:08
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-01-30 13:06:57
 */
import { actionTypes } from './actionTypes'

export const action = {
  listSync() {
    return {
      type: actionTypes.LIST_SYNC
    }
  },

  updateSycn(payload: string) {
    return {
      type: actionTypes.UPDATE_SYCN,
      payload
    }
  }
}
