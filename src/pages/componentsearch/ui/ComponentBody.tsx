/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-24 15:28:37
 * @LastEditTime: 2022-01-25 20:57:56
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { View } from '@tarojs/components'
import { IDavComponent } from '~/../@types/calendar'

import '../index.scss'
import dayjs from 'dayjs'

interface IPageStateProps {
  component: IDavComponent
}

const ComponentBody: React.FC<IPageStateProps> = (props) => {
  const { component } = props
  return (
    <View className='component-body'>
      <View className='event-label' style={{ color: `#${component.color}`, background: `#${component.color}` }}></View>
      <View className='event-content'>
        <View className='title'>{component.summary}</View>
        <View>
          {dayjs(component.dtstart).format('HH:mm') + '-' + dayjs(component.dtend).format('HH:mm') + (component.repeatStatus !== '0' ? '（周期）' : '')}
        </View>
        <View>{component.calendarName}</View>
      </View>
    </View>
  )
}
export default ComponentBody
