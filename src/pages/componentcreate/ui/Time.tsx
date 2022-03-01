/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-24 09:58:53
 * @LastEditTime: 2022-03-01 14:36:56
 * @LastEditors: Derek Xu
 */
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import React from 'react'
import { Flex } from '@taroify/core'

type IPageOption = {
  time: Date
  fullDay: number
}

const Time: React.FC<IPageOption> = (props) => {
  const day = dayjs(props.time).format('DD/MM/YYYY')
  const week = dayjs(props.time).format('ddd')
  const second = dayjs(props.time).format('HH:mm')
  return (
    <View className='vi-component-wrapper_time'>
      <Flex>
        <Flex.Item span={12}> {day}</Flex.Item>
        {props.fullDay === 0 ? <Flex.Item span={12}>{week}</Flex.Item> : <></>}
      </Flex>
      {props.fullDay === 0 ? (
        <Flex className='second'>
          <Flex.Item span={24}> {second}</Flex.Item>
        </Flex>
      ) : (
        <Flex.Item span={12}>{week}</Flex.Item>
      )}
    </View>
  )
}

export default Time
