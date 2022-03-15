/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-01 14:48:18
 * @LastEditTime: 2022-03-10 11:53:00
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { ICheckGroupMember } from '~/../@types/group'
import { Avatar, Cell, Checkbox } from '@taroify/core'
import '../index.scss'

interface IPageOption {
  member: ICheckGroupMember
}
const UserBody: FunctionComponent<IPageOption> = (props) => {
  const { memberId, name, avatar, checked } = props.member

  return (
    <Cell className='cell' size='large'>
      <View className='label'>
        <View className='avatar'>{avatar ? <Avatar src={avatar}></Avatar> : <Avatar>M</Avatar>}</View>
        <View className='item'>
          <View>{name}</View>
        </View>
      </View>
      <Checkbox name={memberId} checked={checked} />
    </Cell>
  )
}

export default UserBody
