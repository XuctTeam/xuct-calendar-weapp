/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-28 19:43:18
 * @LastEditors: Derek Xu
 * @LastEditTime: 2021-12-20 09:15:19
 */
import { REMOVE_SYNC_COMMON, SAVE_SYNC_COMMON } from './actionTypes'

export const action = {
  remove(payload) {
    return {
      type: REMOVE_SYNC_COMMON,
      payload: payload
    }
  },

  save(payload) {
    return {
      type: SAVE_SYNC_COMMON,
      payload: payload
    }
  }
}
