/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-08 09:07:48
 * @LastEditTime: 2022-01-30 13:03:43
 * @LastEditors: Derek Xu
 */
import { usePageScroll } from '@tarojs/taro'
import React, { useState } from 'react'
import { View } from '@tarojs/components'
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
      <View style={{ marginTop: process.env.TARO_ENV === 'h5' ? '60px' : '0px' }}>
        {props.calendars.map((item) => {
          return <CalendarListBody key={item.id + ''} item={item} editCalendar={props.editCalendar}></CalendarListBody>
        })}
      </View>
    </PullRefresh>
  )
}

export default CalendarList
