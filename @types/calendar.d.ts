/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-05 16:50:55
 * @LastEditTime: 2022-01-23 10:07:19
 * @LastEditors: Derek Xu
 */

export interface IDavCalendar {
  id: string
  name: string
  color: string
  major: number
  display: number
  checked?: boolean
  memberId: string
  calendarId: string
  createMemberId: string
  createMemberName: string
  description: string
  isShare: number
  alarmTime: number
  alarmType: string
}

export interface IDavComponent {
  id: string
  calendarId: string
  creatorMemberId: string
  status: string
  summary: string
  location: string
  description: string
  dtstart: Date
  dtend: Date
  alarmType: string
  alarmTimes?: string
  fullDay: number
  color?: string
  calendarName?: string
  repeatStatus?: string
  repeatType?: string
  repeatByday?: string
  repeatBymonth?: string
  repeatBymonthday?: string
  repeatInterval?: number
  repeatUntil?: string
}

export interface ICalendarComponent {
  day: string
  calendarId: string
  components: Array<IDavComponent>
}
