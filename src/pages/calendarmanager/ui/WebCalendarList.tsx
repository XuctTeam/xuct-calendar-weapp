/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-08 09:07:48
 * @LastEditTime: 2022-07-07 15:49:04
 * @LastEditors: Derek Xu
 */
import { usePageScroll } from '@tarojs/taro'
import React, { useState } from 'react'
import { PullRefresh } from '@taroify/core'
import { IDavCalendar } from '~/../@types/calendar'
import CalendarListBody from './CalendarListBody'

import '../index.scss'

interface IPageStateProps {
  loading: boolean | undefined
  calendars: Array<IDavCalendar>
  editCalendar: (id: string) => void
  calendarRefresh: () => void
}

const CalendarList: React.FC<IPageStateProps> = (props) => {
  const [reachTop, setReachTop] = useState(true)
  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  return (
    <PullRefresh
      reachTop={reachTop}
      loading={props.loading}
      onRefresh={() => {
        props.calendarRefresh()
      }}
      style={{ height: '100%' }}
    >
      {props.calendars.map((item) => {
        return <CalendarListBody key={item.id + ''} item={item} editCalendar={props.editCalendar}></CalendarListBody>
      })}
    </PullRefresh>
  )
}

export default CalendarList
