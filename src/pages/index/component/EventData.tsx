/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-05 14:22:09
 * @LastEditTime: 2022-01-17 16:09:29
 * @LastEditors: Derek Xu
 */
import dayjs from 'dayjs'
import React from 'react'
import { View } from '@tarojs/components'
import { IDavComponent } from '~/../@types/calendar'

interface IPageStateProps {
  color?: string
  component: IDavComponent
  viewComponent: (component: IDavComponent) => void
}

const EventData: React.FC<IPageStateProps> = (props) => {
  const { color } = props.component || { color: '417ff9' }

  return (
    <View className='event-container event-item taroify-hairline--bottom' onClick={() => props.viewComponent(props.component)}>
      <View className='event-color' style={{ background: `#${color}` }}></View>
      <View className='event-title'>
        <View className='event-summary-container'> {props.component.summary} </View>
        <View className='event-time'>
          <View className='time-containe'>{dayjs(props.component.dtstart).format('HH:mm') + '-' + dayjs(props.component.dtend).format('HH:mm')}</View>
        </View>
      </View>
    </View>
  )
}

export default EventData
