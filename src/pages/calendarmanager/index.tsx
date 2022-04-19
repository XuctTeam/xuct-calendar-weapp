/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-07 09:15:39
 * @LastEditTime: 2022-04-19 22:18:26
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { IDavCalendar, IDvaCalendarProps } from '~/../@types/calendar'
import { IDvaCommonProps } from '~/../@types/dva'
import { useEnv } from 'taro-hooks'
import { Empty } from '@taroify/core'
import { WeappCalendarList, WebCalendarList } from './ui'

import './index.scss'

const CaldavManager: FunctionComponent = () => {
  const calendars: Array<IDavCalendar> | unknown = useSelector<IDvaCalendarProps>((state) => state.calendar.calendars)
  const loadingEffect = useSelector<IDvaCommonProps, any>((state) => state.loading)
  const refreshLoading = loadingEffect.effects['calendar/listSync']
  const dispatch = useDispatch()
  const env = useEnv()

  useEffect(() => {
    if (!calendars || (calendars instanceof Array && calendars.length === 0)) {
      calendarRefresh()
    }
  }, [])

  const calendarRefresh = () => {
    dispatch({
      type: 'calendar/listSync'
    })
  }

  /**
   * 编辑日历
   * @param id
   */
  const editCalendar = async (id: string) => {
    if (!calendars || !(calendars instanceof Array)) return
    const calendar: IDavCalendar | undefined = calendars.find((item) => item.id === id)
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
    <CommonMain className='vi-calendar-manager-wrapper' title='日历管理' to={4} fixed left>
      {calendars && calendars instanceof Array && calendars.length === 0 ? (
        <Empty>
          <Empty.Image />
          <Empty.Description>暂无数据</Empty.Description>
        </Empty>
      ) : env === 'WEAPP' ? (
        <WeappCalendarList
          calendars={calendars && calendars instanceof Array ? calendars : []}
          loading={refreshLoading}
          calendarRefresh={calendarRefresh}
          editCalendar={editCalendar}
        ></WeappCalendarList>
      ) : (
        <WebCalendarList
          calendars={calendars && calendars instanceof Array ? calendars : []}
          loading={refreshLoading}
          calendarRefresh={calendarRefresh}
          editCalendar={editCalendar}
        ></WebCalendarList>
      )}
    </CommonMain>
  )
}

export default CaldavManager
