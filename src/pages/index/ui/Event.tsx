/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-10-27 17:12:27
 * @LastEditTime: 2022-07-13 19:40:12
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import { usePageScroll } from '@tarojs/taro'
import { Empty, PullRefresh } from '@taroify/core'
import dayjs from 'dayjs'
import { IDvaCommonProps } from '~/../@types/dva'
import { IDavCalendar, ICalendarComponent, IDavComponent } from '~/../@types/calendar'
import { ListEventView, DayEventView } from '../component'

import '../index.scss'

type IPageOption = {
  loading: boolean
  view: number
  today: string
  selectedDay: string
  wxBrower: boolean
  calendars: Array<IDavCalendar>
  calendarComponents: Array<ICalendarComponent>
  componentRefreshOpen: boolean
  refreshComponent: () => void
  viewComponent: (component: IDavComponent) => void
}

interface ISelectCalendar {
  name: string
  color: string
  checked: boolean
}

const currentTime = dayjs().valueOf()

const Event: FunctionComponent<IPageOption> = (props) => {
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)
  const [componentList, setComponentList] = useState<IDavComponent[]>([])
  const [reachTop, setReachTop] = useState(true)
  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  useEffect(() => {
    if (!accessToken) {
      setComponentList([])
      return
    }
    if (!props.calendars || props.calendars.length === 0) {
      setComponentList([])
      return
    }
    const map: Map<string, ISelectCalendar> = new Map<string, ISelectCalendar>()
    props.calendars
      .filter((c) => c.display === 1)
      .forEach((c) => {
        map.set(c.calendarId, { name: c.name, color: c.color, checked: c.checked ? true : false })
      })
    let cps: Array<IDavComponent> = []
    if (props.calendarComponents && props.calendarComponents.length !== 0) {
      props.calendarComponents.forEach((c) => {
        if (!c.components) return
        const selectedCalendar: ISelectCalendar | undefined = map.get(c.calendarId)
        if (selectedCalendar == null) return
        if (selectedCalendar.checked && dayjs(props.selectedDay).isSame(dayjs(c.day), 'day')) {
          cps = cps.concat(
            c.components.map((item) => {
              return { ...item, color: selectedCalendar.color, calendarName: selectedCalendar.name }
            })
          )
        }
      })
    }
    cps.sort((n1, n2) => {
      return dayjs(n1.dtstart).unix() - dayjs(n2.dtstart).unix()
    })
    setComponentList(cps)
  }, [accessToken, props.selectedDay, props.calendars, props.calendarComponents])

  return (
    <View className='vi-index-wrapper_event'>
      {componentList.length == 0 ? (
        <Empty>
          <Empty.Image />
          <Empty.Description>暂无数据</Empty.Description>
        </Empty>
      ) : (
        <View style={{ minHeight: '290px' }}>
          {props.view === 0 ? (
            <DayEventView
              selectedDay={props.selectedDay}
              viewComponent={props.viewComponent}
              currentTime={currentTime}
              today={props.today}
              componentList={componentList}
            ></DayEventView>
          ) : (
            <ListEventView
              selectedDay={props.selectedDay}
              viewComponent={props.viewComponent}
              currentTime={currentTime}
              today={props.today}
              componentList={componentList}
            ></ListEventView>
          )}
        </View>
      )}
    </View>
  )
}

export default Event
