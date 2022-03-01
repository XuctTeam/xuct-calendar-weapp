/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-08 09:07:48
 * @LastEditTime: 2022-03-01 15:27:35
 * @LastEditors: Derek Xu
 */
import { usePageScroll } from '@tarojs/taro'
import React, { useState } from 'react'
import { ScrollView, View } from '@tarojs/components'
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
  const [scrollTop, setScrollTop] = useState<number>(0)

  const onRefresherRefresh = () => {
    props.calendarRefresh()
  }

  return (
    <View className='vi-calendar-manager-wrapper_container'>
      <View className='list'>
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
      </View>
    </View>
  )
}

export default CalendarList
