/*
 * @Author: Derek Xu
 * @Date: 2022-05-25 10:23:39
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-25 14:27:35
 * @FilePath: \xuct-calendar-weapp\src\pages\index\component\ListEventView.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 徐涛 jianhao2010303@163.com, All Rights Reserved.
 */
import { FunctionComponent } from 'react'
import { Flex } from '@taroify/core'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import ListEventData from './ListEventData'
import { IDavComponent } from '~/../@types/calendar'

interface IPageOption {
  selectedDay: string
  componentList: IDavComponent[]
  today: string
  viewComponent: (component: IDavComponent) => void
  currentTime: number
}

const ListEventView: FunctionComponent<IPageOption> = (props) => {
  return (
    <Flex>
      <Flex.Item span={4} className='week-day'>
        <View className='day'>{dayjs(props.selectedDay).format('DD')}</View>
        <View className='week'>{dayjs(props.selectedDay).format('ddd')}</View>
      </Flex.Item>
      <Flex.Item span={20} className='event-list-content'>
        {props.componentList.map((component, i) => {
          return (
            <ListEventData
              key={i}
              component={component}
              viewComponent={props.viewComponent}
              selecteday={props.selectedDay}
              today={props.today}
              current={props.currentTime}
            ></ListEventData>
          )
        })}
      </Flex.Item>
    </Flex>
  )
}

export default ListEventView
