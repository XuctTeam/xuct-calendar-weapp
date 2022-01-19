/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-11 13:20:49
 * @LastEditTime: 2022-01-16 10:18:55
 * @LastEditors: Derek Xu
 */
import { IDavCalendar } from '~/../@types/calendar'
import { list, get } from '@/api/calendar'

export default {
  namespace: 'calendar', // 这是模块名,
  state: {
    calendars: []
  },

  effects: {
    *listSync({}, { call, put }) {
      yield put({
        type: 'push',
        payload: []
      })
      const result = yield call(list)
      yield put({
        type: 'push',
        payload: result
      })
      return result
    },

    *updateSycn({ payload }, { call, put }) {
      const result = yield call(get, payload)
      yield put({
        type: 'update',
        payload: result
      })
    }
  },

  reducers: {
    push(state, { payload }) {
      const calendars = payload as any as Array<IDavCalendar>
      calendars.forEach((c) => (c.checked = true))
      return { ...state, calendars }
    },

    selected(state, { payload }) {
      const values: Array<string> = payload as any as Array<string>
      const calendars = state.calendars.map((i) => {
        return { ...i, checked: values.includes(i.calendarId) ? true : false }
      })
      return { ...state, calendars }
    },

    update(state, { payload }) {
      const calendar = payload as any as IDavCalendar
      const index = state.calendars.findIndex((i) => i.id === calendar.id)
      if (index !== -1) {
        const replaceCalendar: IDavCalendar = state.calendars[index]
        const calendars = [...state.calendars]
        calendars.splice(index, 1, { ...calendar, checked: replaceCalendar.checked })
        return { ...state, calendars }
      }
      return { ...state, calendars: [...state.calendars, ...Array.of([calendar])] }
    }
  }
}
