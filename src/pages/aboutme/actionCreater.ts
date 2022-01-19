/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-05 13:56:53
 * @LastEditTime: 2021-12-09 12:46:30
 * @LastEditors: Derek Xu
 */
import { SAVE_SYNC_COMMON, SAVE_COLOR } from './actionTypes'

export const action = {
  saveStorageSync(payload) {
    return {
      type: SAVE_SYNC_COMMON,
      payload
    }
  },

  saveColor(payload) {
    return {
      type: SAVE_COLOR,
      payload
    }
  }
}
