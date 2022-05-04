/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-07 10:37:56
 * @LastEditTime: 2022-05-02 20:52:49
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { View } from '@tarojs/components'
import { Flex } from '@taroify/core'
import { Edit } from '@taroify/icons'
import { IDavCalendar } from '~/../@types/calendar'

import '../index.scss'

interface IPageOption {
  item: IDavCalendar
  editCalendar: (id: string | null) => void
}

const CalendarListBody: React.FC<IPageOption> = (props) => {
  const { id, name, color, description, createMemberName } = props.item || { id: '' }
  return (
    <View className='vi-calendar-manager-wrapper_list'>
      <View className='container'>
        <View className='header'>
          <Flex>
            <Flex.Item span={3}>
              <View className='color'>
                <View className='square' style={{ background: `#${color}` }}></View>
              </View>
            </Flex.Item>
            <Flex.Item span={18} className='title'>
              {name}
            </Flex.Item>
            <Flex.Item span={3}>
              <Edit onClick={() => props.editCalendar(id)}></Edit>
            </Flex.Item>
          </Flex>
        </View>
        <View className='content'>
          <View className='mark taroify-ellipsis--l3'>日历描述: {description}</View>
          <View className='ower'>拥有者: {createMemberName}</View>
        </View>
      </View>
    </View>
  )
}

export default CalendarListBody
