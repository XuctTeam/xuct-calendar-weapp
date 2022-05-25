/*
 * @Author: Derek Xu
 * @Date: 2022-05-25 10:31:59
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-25 16:01:28
 * @FilePath: \xuct-calendar-weapp\src\pages\index\component\DayEventView.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 徐涛 jianhao2010303@163.com, All Rights Reserved.
 */
import { FunctionComponent, useEffect, useState } from 'react'
import { ScrollView, View } from '@tarojs/components'
import { IDavComponent } from '~/../@types/calendar'
import dayjs from 'dayjs'
import DayEventListData from './DayEventListData'

interface IPageOption {
  selectedDay: string
  componentList: IDavComponent[]
  today: string
  viewComponent: (component: IDavComponent) => void
  currentTime: number
}

const DayEventView: FunctionComponent<IPageOption> = (props) => {
  const [timeMap, setTimeMap] = useState<Map<string, IDavComponent[]>>()

  useEffect(() => {
    _fillTimeMap(props.componentList)
  }, [props.componentList])

  const _fillTimeMap = (list: IDavComponent[]) => {
    const map = new Map<string, IDavComponent[]>()
    list.forEach((c) => {
      const _time = dayjs(c.dtstart).hour()
      const _key = _time > 10 ? _time + ':00' : '0' + _time + ':00'
      if (map.has(_key)) {
        map.get(_key)?.push(c)
        return
      }
      map.set(_key, [c])
    })
    console.log(map)
    setTimeMap(map)
  }

  return (
    <View className='day-event-list'>
      {Array.from({ length: 24 }, (v, k) => k).map((i, index) => {
        return (
          <View className='item taroify-hairline--bottom' key={index}>
            <View className='timer'>{i < 10 ? `0${i}:00` : `${i}:00`}</View>
            <ScrollView className='item-event' scrollX scrollWithAnimation>
              <DayEventListData componentList={!timeMap ? [] : timeMap.get(i < 10 ? `0${i}:00` : `${i}:00`) || []}></DayEventListData>
            </ScrollView>
          </View>
        )
      })}
    </View>
  )
}

export default DayEventView
