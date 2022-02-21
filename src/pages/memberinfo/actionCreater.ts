/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-28 19:43:18
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-21 22:53:19
 */
import { REMOVE_SYNC_COMMON, SAVE_SYNC_COMMON, UPDATE_CALENDAR_MEMBER_NAME } from './actionTypes'

export const action = {
  remove(payload) {
    return {
      type: REMOVE_SYNC_COMMON,
      payload
    }
  },

  save(payload) {
    return {
      type: SAVE_SYNC_COMMON,
      payload
    }
  },

  updateCalendarMemberName(payload) {
    return {
      type: UPDATE_CALENDAR_MEMBER_NAME,
      payload
    }
  }
}
