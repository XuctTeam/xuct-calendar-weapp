/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-01 14:48:18
 * @LastEditTime: 2022-03-15 16:22:15
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { TMember } from '~/../@types/group'
import { Avatar, Cell } from '@taroify/core'

interface IPageOption {
  member: TMember
}
const UserBody: FunctionComponent<IPageOption> = (props) => {
  const { name, avatar } = props.member

  return (
    <Cell className='cell' size='large'>
      <View className='label'>
        <View className='avatar'>{avatar ? <Avatar src={avatar}></Avatar> : <Avatar>M</Avatar>}</View>
        <View className='item'>
          <View>{name}</View>
        </View>
      </View>
    </Cell>
  )
}

export default UserBody
