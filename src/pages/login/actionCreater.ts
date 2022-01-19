/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-11 13:30:34
 * @LastEditTime: 2021-11-24 19:08:33
 * @LastEditors: Derek Xu
 */
import { SAVE_SYNC_COMMON } from './actionTypes'

export const action = {
  saveStorageSync(payload) {
    return {
      type: SAVE_SYNC_COMMON,
      payload: payload
    }
  }
}
