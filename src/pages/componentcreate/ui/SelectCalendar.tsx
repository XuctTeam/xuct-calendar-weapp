/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-23 15:18:47
 * @LastEditTime: 2021-12-23 20:26:49
 * @LastEditors: Derek Xu
 */
import { View } from '@tarojs/components'
import React from 'react'

type IPageStateProps = {
  color: string
  title: string
}

const SelectCalendar: React.FC<IPageStateProps> = (props) => {
  return (
    <View className='vi-schedule-wrapper_calendar'>
      <View className='circle' style={{ backgroundColor: `#${props.color}` }}></View>
      <View>{props.title}</View>
    </View>
  )
}
export default SelectCalendar
