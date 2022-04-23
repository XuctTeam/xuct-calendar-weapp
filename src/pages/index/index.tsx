/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 12:39:07
 * @FilePath: \xuct-calendar-weapp\src\pages\index\index.tsx
 * @LastEditTime: 2022-04-23 20:14:39
 * @LastEditors: Derek Xu
 */
import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDidShow } from '@tarojs/taro'
import Router from 'tarojs-router-next'
import { View } from '@tarojs/components'
import { Button, Collapse } from '@taroify/core'
import { Plus, Search } from '@taroify/icons'
import dayjs from 'dayjs'
import { ICurrentDay } from '~/../@types/date'
import { getToday } from '@/utils/utils'
import { useWebEnv } from '@/utils/taro'
import CalendarTypes from '@/components/calendar/types/calendar'
import { IDavCalendar, ICalendarComponent, IDavComponent, IDvaCalendarProps, IDvaComponentProps } from '~/../@types/calendar'
import { IDvaCommonProps } from '~/../@types/dva'
import { componentsDaysById } from '@/api/component'
import CommonMain from '@/components/mixin'
import IconFont from '@/components/iconfont'
import { Picker, Event, CaldavList } from './ui'

const day: ICurrentDay = getToday()
// eslint-disable-next-line react-hooks/rules-of-hooks
const env = useWebEnv()

const Index: FunctionComponent = () => {
  const calRef = React.createRef()
  const reduxDispatch = useDispatch()
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)
  const calendars: Array<IDavCalendar> | unknown = useSelector<IDvaCalendarProps>((state) => state.calendar.calendars)
  const componentRefreshTime: number | unknown = useSelector<IDvaComponentProps>((state) => state.component.refreshTime)

  const [selectedDay, setSelectedDay] = useState<string>(day.current)
  const [popOpen, setPopOpen] = useState<boolean>(false)
  const [marks, setMarks] = useState<CalendarTypes.Mark[]>([])
  const [componentLoading, setComponentLoading] = useState<boolean>(false)
  const [componentRefreshOpen, setComponentRefreshOpen] = useState<boolean>(false)
  const [componentRefreshLocalTime, setComponentRefreshLocalTime] = useState<number>(0)
  const [calendarComponents, setCalendarComponents] = useState<ICalendarComponent[]>([])

  useEffect(() => {
    if (!accessToken) {
      _removeStore()
      return
    }
  }, [accessToken])

  useDidShow(() => {
    if (!accessToken) return
    if (calendars instanceof Array && calendars.length === 0) {
      new Promise((resolve) => {
        reduxDispatch({
          type: 'calendar/listSync',
          payload: {
            //这里的payload是用于传入参数，将resolve作为一个函数参数传入
            resolve
          }
        })
      })
        .then((res) => {
          const start: string = dayjs(selectedDay).startOf('month').format('YYYY-MM-DD HH:mm:ss')
          const end: string = dayjs(selectedDay).endOf('month').format('YYYY-MM-DD HH:mm:ss')
          _queryComponent(res as any as Array<IDavCalendar>, start, end)
        })
        .catch((err) => {
          console.log(err)
        })
      return
    }
    console.log(typeof componentRefreshTime === 'number' && componentRefreshLocalTime < componentRefreshTime)
    const start: string = dayjs(selectedDay).startOf('month').format('YYYY-MM-DD HH:mm:ss')
    const end: string = dayjs(selectedDay).endOf('month').format('YYYY-MM-DD HH:mm:ss')
    if (
      (!componentRefreshTime && calendars instanceof Array && calendars.length !== 0) ||
      (typeof componentRefreshTime === 'number' && componentRefreshLocalTime < componentRefreshTime)
    ) {
      _queryComponent(calendars, start, end)
    }
  })

  /**
   * 今日图标点击
   */
  const currentClickHandle = () => {
    const today: string = day.current
    //@ts-ignore
    calRef.current.reset(today)
    setSelectedDay(today)
  }

  const selectDayClickHadnle = (item: { value: CalendarTypes.SelectedDate }) => {
    setSelectedDay(item.value.start.toString())
  }

  /**
   * 日期长按住
   * @param item
   * @returns
   */
  const selectDayLongClick = (item: { value: string }): void => {
    console.log(item.value)
  }

  /**
   * 日历月份改变
   *
   * @param value
   */
  const selectMonthChage = (value: string) => {
    if (!accessToken) return
    _queryComponent(calendars, dayjs(value).startOf('month').format('YYYY-MM-DD HH:mm:ss'), dayjs(value).endOf('month').format('YYYY-MM-DD HH:mm:ss'))
  }

  /**
   * @description 日历点击
   * @param value
   */
  const calendarSelected = (value: string[]) => {
    reduxDispatch({
      type: 'calendar/selected',
      payload: value
    })
  }

  const calendarAccordionChage = () => {
    setComponentRefreshOpen(!componentRefreshOpen)
  }

  /**
   * @description 新增或修改日程
   */
  const createComponent = () => {
    Router.toComponentcreate({
      data: {
        calendars: calendars,
        selectedDay: selectedDay + dayjs().format(' HH:mm')
      }
    })
  }

  /**
   * @description 日程列表刷新
   */
  const componentRefresh = () => {
    _queryComponent(
      calendars,
      dayjs(selectedDay).startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      dayjs(selectedDay).endOf('month').format('YYYY-MM-DD HH:mm:ss')
    )
  }

  /**
   * @description 日程查看
   */
  const viewComponent = async (component: IDavComponent) => {
    Router.toComponentview({
      params: {
        componentId: component.id,
        add: false
      },
      data: {
        component: component
      }
    })
  }

  /**
   * @description 查询日历下所有日程
   *
   * @param calList
   * @param start
   * @param end
   */
  const _queryComponent = (calList: Array<IDavCalendar> | unknown, start: string, end: string) => {
    if (!calList || !(calList instanceof Array)) return
    setCalendarComponents([])
    setComponentLoading(true)
    setMarks([])
    let pList: Array<Promise<any>> = []
    calList.forEach((calendar) => {
      pList.push(
        new Promise(function (resolve, reject) {
          componentsDaysById(calendar.calendarId, start, end)
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      )
    })
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let calendarComponents: Array<ICalendarComponent> = []
    Promise.all(
      pList.map((p) => {
        return p.catch((error) => error)
      })
    )
      .then((res) => {
        if (!(res instanceof Array)) return
        res.forEach((i) => (calendarComponents = calendarComponents.concat(i)))
        _fillMarkDay(calendarComponents)
        const now: number = dayjs().unix()
        setCalendarComponents(calendarComponents)
        setComponentRefreshLocalTime(now)
        setComponentLoading(false)
        reduxDispatch({
          type: 'component/refreshTime',
          payload: now
        })
      })
      .catch((error) => {
        console.log(error, 'error')
        setComponentLoading(false)
      })
  }

  /**
   * @description 补充日历上有日程的天
   *
   * @param components
   * @returns
   */
  const _fillMarkDay = (components: Array<ICalendarComponent>) => {
    if (components.length === 0) return
    const daySet: Set<string> = new Set<string>([])
    components.forEach((comp) => {
      daySet.add(dayjs(comp.day).format('YYYY/MM/DD'))
    })
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const marks: Array<CalendarTypes.Mark> = Array.from(daySet).map((i) => {
      return { value: i }
    })
    setMarks(marks)
  }

  const _removeStore = () => {
    setMarks([])
    setComponentRefreshLocalTime(0)
    setCalendarComponents([])
  }

  return (
    <Fragment>
      <CommonMain className='vi-index-wrapper' title='楚日历' fixed left={false}>
        <Collapse defaultValue={[0]} bordered onChange={calendarAccordionChage}>
          <Collapse.Item
            clickable={false}
            className='custom-collapse-item1'
            title={
              <View className='vi-index-wrapper_calendar'>
                <View
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setPopOpen(true)
                  }}
                >
                  <IconFont name='rili' size={54} />
                </View>
                <View className='day'>{selectedDay}</View>
              </View>
            }
            extra={
              <>
                <Search
                  size={18}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    Router.toComponentsearch()
                  }}
                />
              </>
            }
          >
            <Picker
              ref={calRef}
              currentDay={dayjs(selectedDay).format('YYYY/MM/DD')}
              marks={marks}
              selectMonthChage={selectMonthChage}
              selectDayLongClick={selectDayLongClick}
              selectDayClick={selectDayClickHadnle}
            ></Picker>
          </Collapse.Item>
        </Collapse>
        <Event
          loading={componentLoading}
          today={day.current}
          selectedDay={selectedDay}
          calendars={calendars && calendars instanceof Array ? calendars : []}
          calendarComponents={calendarComponents}
          componentRefreshOpen={!componentRefreshOpen}
          refreshComponent={componentRefresh}
          viewComponent={viewComponent}
        ></Event>
      </CommonMain>
      <View className='vi-index_home-fab' style={{ bottom: env ? '80px' : '20px' }}>
        {!!accessToken && <Button size='small' variant='contained' color='primary' shape='round' icon={<Plus />} onClick={createComponent} />}
      </View>
      <CaldavList
        hasLogin={!!accessToken}
        open={popOpen}
        closePopup={() => setPopOpen(false)}
        calendars={calendars && calendars instanceof Array ? calendars : []}
        selected={calendarSelected}
      ></CaldavList>

      {selectedDay !== day.current && (
        <View className='vi-index_today-icon' style={{ bottom: env ? '80px' : '10px' }} onClick={currentClickHandle}>
          今
        </View>
      )}
    </Fragment>
  )
}

export default Index
