/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-01 14:48:18
 * @LastEditTime: 2022-03-16 09:00:43
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
    <Cell className='cell' size='large' bordered>
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
