/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-10-28 16:27:27
 * @LastEditTime: 2021-12-03 21:13:57
 * @LastEditors: Derek Xu
 */

export type CalendarDateArg = string | number | Date

export interface CalendarSelectedDate {
  end?: CalendarDateArg
  start: CalendarDateArg
}

/** 日期组件类型 */
export interface PickerProps {
  ref?: any
  currentDay: string
  selectDayClick: (item: { value: CalendarSelectedDate }) => void
}
