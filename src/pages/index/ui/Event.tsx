/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-10-27 17:12:27
 * @LastEditTime: 2022-01-17 17:56:28
 * @LastEditors: Derek Xu
 */
import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { Empty, Flex, Loading, PullRefresh } from '@taroify/core'
import dayjs from 'dayjs'
import { IDavCalendar, ICalendarComponent, IDavComponent } from '~/../@types/calendar'
import EventData from '../component/EventData'

import '../index.scss'
import { usePageScroll } from '@tarojs/taro'

type IPageStateProps = {
  loading: boolean
  selectedDay: string
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

const Event: React.FC<IPageStateProps> = (props) => {
  const [componentList, setComponentList] = useState<Array<IDavComponent>>([])
  const [reachTop, setReachTop] = useState(true)
  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  useEffect(() => {
    if (props.calendars && props.calendars.length !== 0) {
      const map: Map<string, ISelectCalendar> = new Map<string, ISelectCalendar>()
      props.calendars.forEach((c) => {
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
    }
  }, [props])

  return (
    <View className='vi-index_event'>
      <PullRefresh reachTop={reachTop} loading={props.loading} onRefresh={props.refreshComponent} disabled={props.componentRefreshOpen}>
        {componentList.length !== 0 ? (
          <Flex>
            <Flex.Item span={4} className='week-day'>
              <View className='day'>{dayjs(props.selectedDay).format('DD')}</View>
              <View className='week'>{dayjs(props.selectedDay).format('ddd')}</View>
            </Flex.Item>
            <Flex.Item span={20} className='event-list-content'>
              {componentList.map((component, i) => {
                return <EventData key={i} component={component} viewComponent={props.viewComponent}></EventData>
              })}
            </Flex.Item>
          </Flex>
        ) : (
          <>
            {!props.loading && (
              <Empty>
                <Empty.Image />
                <Empty.Description>暂无数据</Empty.Description>
              </Empty>
            )}
          </>
        )}
      </PullRefresh>
    </View>
  )
}

export default Event
