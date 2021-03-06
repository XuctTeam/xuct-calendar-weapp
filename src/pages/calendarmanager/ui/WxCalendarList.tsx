/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-08 09:07:48
 * @LastEditTime: 2022-07-07 17:03:30
 * @LastEditors: Derek Xu
 */
import React, { useState } from 'react'
import { ScrollView } from '@tarojs/components'
import { IDavCalendar } from '~/../@types/calendar'
import CalendarListBody from './CalendarListBody'

import '../index.scss'

interface IPageStateProps {
  loading: boolean | undefined
  calendars: Array<IDavCalendar>
  editCalendar: (id: string) => void
  calendarRefresh: () => void
}

const WxCalendarList: React.FC<IPageStateProps> = (props) => {
  const [scrollTop, setScrollTop] = useState<number>(0)

  const onRefresherRefresh = () => {
    props.calendarRefresh()
  }

  return (
    <ScrollView
      style={{ height: '100%' }}
      scrollY
      refresherTriggered={props.loading}
      scrollWithAnimation
      refresherEnabled
      enhanced
      showScrollbar={false}
      scrollTop={scrollTop}
      onScroll={(e) => setScrollTop(e.detail.scrollTop)}
      onRefresherRefresh={() => onRefresherRefresh()}
    >
      {props.calendars.map((item) => {
        return <CalendarListBody key={item.id + ''} item={item} editCalendar={props.editCalendar}></CalendarListBody>
      })}
    </ScrollView>
  )
}

export default WxCalendarList
