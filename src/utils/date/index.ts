/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-06 13:28:00
 * @LastEditTime: 2022-01-07 15:56:42
 * @LastEditors: Derek Xu
 */
import dayjs, { Dayjs } from 'dayjs'
import lunarFun from 'lunar-fun'
/**
 *
 * @param date 获取阴历日期
 * @returns
 */
export const lunarDay = (date: Date | string): any => {
  const dayjsDay: Dayjs = dayjs(date)
  return lunarFun.lunalToGregorian(dayjsDay.get('year'), dayjsDay.get('month'), dayjsDay.get('date'))
}
