/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-24 15:28:37
 * @LastEditTime: 2022-01-24 19:08:33
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { View } from '@tarojs/components'
import { IDavComponent } from '~/../@types/calendar'

import '../index.scss'

interface IPageStateProps {
  component: IDavComponent
}

const ComponentBody: React.FC<IPageStateProps> = (props) => {
  const { component } = props
  return (
    <View className='component-body'>
      <View className='event-label' style={{ color: `#${component.color}`, background: `#${component.color}` }}></View>
      <View className='event-content'>{component.summary}</View>
    </View>
  )
}
export default ComponentBody
