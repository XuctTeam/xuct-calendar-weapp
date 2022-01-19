/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-08 09:07:48
 * @LastEditTime: 2022-01-17 14:32:48
 * @LastEditors: Derek Xu
 */
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View } from '@tarojs/components'
import { PullRefresh } from '@taroify/core'
import Router from 'tarojs-router-next'
import CalendarListBody from './CalendarListBody'
import { IDavCalendar } from '~/../@types/calendar'
import '../index.scss'
import { usePageScroll } from '@tarojs/taro'

interface IPageStateProps {
  loading: boolean | undefined
  calendars: Array<IDavCalendar>
  calendarRefresh: () => void
}

const CalendarList: React.FC<IPageStateProps> = (props) => {
  const dispatch = useDispatch()
  const [reachTop, setReachTop] = useState(true)
  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  /**
   * 编辑日历
   * @param id
   */
  const editCalendar = async (id: string) => {
    const calendar: IDavCalendar | undefined = props.calendars.find((item) => item.id === id)
    if (!calendar) return
    try {
      const result = await Router.toCalendarcreate({
        data: calendar,
        params: {
          calendarId: calendar.id
        }
      })
      //编辑成功
      if (result && result.data === '1') {
        dispatch({
          type: 'calendar/updateSycn',
          payload: id
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

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
          return <CalendarListBody key={item.id + ''} item={item} editCalendar={editCalendar}></CalendarListBody>
        })}
      </View>
    </PullRefresh>
  )
}

/** 需要用connect */
export default connect(() => ({}))(CalendarList)
