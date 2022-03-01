/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-23 15:18:47
 * @LastEditTime: 2022-03-01 14:36:52
 * @LastEditors: Derek Xu
 */
import { View } from '@tarojs/components'
import React from 'react'

type IPageOption = {
  color: string
  title: string
}

const SelectCalendar: React.FC<IPageOption> = (props) => {
  return (
    <View className='vi-component-wrapper_calendar'>
      <View className='circle' style={{ backgroundColor: `#${props.color}` }}></View>
      <View>{props.title}</View>
    </View>
  )
}
export default SelectCalendar
