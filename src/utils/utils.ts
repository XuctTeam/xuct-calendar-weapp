/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-30 14:27:41
 * @FilePath: \react-lesson-20\src\utils\utils.ts
 * @LastEditTime: 2022-01-19 10:29:36
 * @LastEditors: Derek Xu
 */

import dayjs from 'dayjs'

import { ICurrentDay } from '../../@types/date'
import { lunarDay } from './date'
import { IDavAlarm } from '~/../@types/calendar'

/**
 * 获取当日日期
 *
 * @returns
 */
export const getToday = (): ICurrentDay => {
  let day = dayjs()
  return {
    current: day.format('YYYY-MM-DD'),
    detail: {
      year: day.year(),
      month: day.month() + 1,
      day: day.day()
    },
    lunar: lunarDay(day.toDate())
  }
}

/**
 * base 64
 * @param str
 * @returns
 */
export const base64 = (str: string): string => {
  const buff = Buffer.from(str, 'utf-8')
  return buff.toString('base64')
}

/**
 * 获取星期格式化
 * @param week
 * @returns
 */
export const formatWeek = (week: number): string => {
  console.log(week)
  switch (week) {
    case 0:
      return '周日'
    case 1:
      return '周一'
    case 2:
      return '周二'
    case 3:
      return '周三'
    case 4:
      return '周四'
    case 5:
      return '周五'
    case 6:
      return '周六'
  }
  return ''
}

/**
 * 格式化重复事件
 * @param repeatType
 * @param repeatByday
 * @param repeatBymonth
 * @param repeatBymonthday
 */
export const formatRepeatTime = (
  repeatType: string,
  repeatStatus: string,
  repeatByday: string,
  repeatBymonth: string,
  repeatBymonthday: string,
  repeatInterval: number
): string => {
  switch (repeatType) {
    case 'DAILY':
      return repeatInterval === 1 ? '每天' : '每' + repeatInterval + '天'
    case 'WEEKLY':
      return _formatWeeklyText(repeatInterval, repeatStatus, repeatByday)
    case 'MONTHLY':
      return _formatMonthlyText(repeatInterval, repeatStatus, repeatByday, repeatBymonthday)
    default:
      return _formatYearlyText(repeatInterval, repeatBymonth, repeatBymonthday)
  }
}

/**
 * 格式化提醒显示
 * @param alarm
 * @returns
 */
export const formatAlarmText = (alarm: IDavAlarm): string => {
  if (alarm.alarmType === '0') return '不提醒'
  const formatTimes: Array<string> = alarm.alarmTime.map((i) => {
    if (i === '60') return '1小时前'
    else if (i === '1440') return '1天前'
    return i + '分钟前'
  })
  let alarmType = ''
  switch (alarm.alarmType) {
    case '1':
      alarmType = '站内信提醒'
      break
    case '2':
      alarmType = '邮箱提醒'
      break
    default:
      alarmType = '公众号提醒'
  }
  formatTimes.push(alarmType)
  return formatTimes.join('，')
}

/**
 * 格式化星期显示
 * @param repeatInterval
 * @param repeatStatus
 * @param repeatByday
 * @returns
 */
const _formatWeeklyText = (repeatInterval: number, repeatStatus: string, repeatByday: string): string => {
  switch (repeatStatus) {
    case '2':
      return '每周一至五'
    case '3':
      return '每周六、周日'
    case '4':
      return '每周（周六）'
    default:
      break
  }
  const weeks = repeatByday.split(',').map((i) => {
    return formatWeek(Number.parseInt(i.split(':')[1]))
  })
  return (repeatInterval === 1 ? '每周' : '每' + repeatInterval + '周的') + weeks.join(',')
}

/**
 * 格式化月显示
 * @param repeatInterval
 * @param repeatStatus
 * @param repeatBymonth
 * @param repeatBymonthday
 * @param selectedDate
 */
const _formatMonthlyText = (repeatInterval: number, repeatStatus: string, repeatByday: string, repeatBymonthday: string): string => {
  const monthDays = repeatByday ? repeatByday.split(':') : []
  switch (repeatStatus) {
    case '5':
      return '每月（' + repeatBymonthday + '日）'
    case '6':
      return '每月（第' + monthDays[0] + '个' + formatWeek(Number.parseInt(monthDays[1])) + ')'
  }
  if (repeatBymonthday) {
    if (repeatInterval === 1) {
      return '每月（' + repeatBymonthday + '日）'
    }
    return '每' + repeatInterval + '月（' + repeatBymonthday + '日）'
  }

  if (repeatInterval === 1) {
    return '每月（第' + monthDays[0] + '个' + monthDays[1] + ')'
  }
  return '每' + repeatInterval + '月（第' + monthDays[0] + '个' + formatWeek(Number.parseInt(monthDays[1])) + ')'
}

/**
 * 格式化年重复
 * @param repeatInterval
 * @param repeatBymonth
 * @param repeatBymonthday
 */
const _formatYearlyText = (repeatInterval: number, repeatBymonth: string, repeatBymonthday: string) => {
  if (repeatInterval === 1) {
    return '每年（' + repeatBymonth + '月' + repeatBymonthday + '日）'
  }
  return '每' + repeatInterval + '年（' + repeatBymonth + '月' + repeatBymonthday + '日）'
}

/**
 * 格式化五分钟
 * @param date
 */
export const fiveMinutes = (date: Date): Date => {
  const min = dayjs(date).minute()
  if (min % 5 === 0) return date
  if (min > 55) return dayjs(date).add(1, 'hour').minute(0).second(0).toDate()
  const d = dayjs(date)
    .add(5 - (min % 5), 'minute')
    .second(0)
    .toDate()
  return d
}

/**
 * 正则判断电话号码
 * @param phone
 * @returns
 */
export const checkMobile = (phone: string): boolean => {
  return /^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)
}
