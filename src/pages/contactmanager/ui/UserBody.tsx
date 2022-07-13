/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-01 14:48:18
 * @LastEditTime: 2022-07-13 16:34:08
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { IGroupMember } from '~/../@types/group'
import { Avatar, Cell } from '@taroify/core'
import '../index.scss'

interface IPageOption {
  charCode: string
  member: IGroupMember
}
const UserBody: FunctionComponent<IPageOption> = (props) => {
  const { name, avatar, groupName } = props.member

  return (
    <Cell className='cell'>
      {avatar ? <Avatar src={avatar}></Avatar> : <Avatar style={{ background: 'green' }}>{props.charCode}</Avatar>}
      <View className='item'>
        <View>{name}</View>
        <View className='group'>{groupName}</View>
      </View>
    </Cell>
  )
}

export default UserBody
