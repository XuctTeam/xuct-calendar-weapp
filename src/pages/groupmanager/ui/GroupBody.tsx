/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-07 21:52:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-08 22:31:25
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Cell, Avatar } from '@taroify/core'
import { Arrow } from '@taroify/icons'
import { IGroup } from '~/../@types/group'

interface IPageStateProps {
  group: IGroup
}

const GroupBody: FunctionComponent<IPageStateProps> = (props) => {
  const { name } = props.group

  return (
    <Cell className='vi-group-manager-warpper_group-list' rightIcon={<Arrow />} clickable>
      <Avatar>P</Avatar>
      <View className='cell'>
        <View className='title'>name</View>
        <View className='number'>组内 100 人</View>
      </View>
    </Cell>
  )
}

export default GroupBody
