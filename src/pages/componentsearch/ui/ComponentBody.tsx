/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-24 15:28:37
 * @LastEditTime: 2022-03-01 14:36:10
 * @LastEditors: Derek Xu
 */
import React from 'react'
import dayjs from 'dayjs'
import { View } from '@tarojs/components'
import { IDavComponent } from '~/../@types/calendar'
import '../index.scss'

interface IPageOption {
  component: IDavComponent
  viewComponent: (component: IDavComponent) => void
}

const ComponentBody: React.FC<IPageOption> = (props) => {
  const { component } = props

  const view = () => {
    props.viewComponent(component)
  }

  return (
    <View className='component-body'>
      <View className='event-label' style={{ color: `#${component.color}`, background: `#${component.color}` }}></View>
      <View className='event-content' onClick={() => view()}>
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
