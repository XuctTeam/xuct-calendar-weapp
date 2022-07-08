/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-01 14:48:18
 * @LastEditTime: 2022-07-09 06:23:12
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { IGroupMember } from '~/../@types/group'
import { Ellipsis } from '@taroify/icons'
import { Avatar, Cell, Tag } from '@taroify/core'
import '../index.scss'

interface IPageOption {
  member: IGroupMember
  uid: string
  actionClick: (ty: number, memberId: string) => void
}
const UserBody: FunctionComponent<IPageOption> = (props) => {
  const { name, avatar, memberId, groupCreateMemberId } = props.member
  const groupOwner: boolean = (memberId && groupCreateMemberId && memberId === groupCreateMemberId) || false

  const getActionView = (): JSX.Element => {
    if (groupOwner)
      return (
        <Tag shape='rounded' size='medium' color='danger'>
          管理员
        </Tag>
      )
    if (props.uid === memberId)
      return (
        <Ellipsis
          onClick={(e) => {
            e.stopPropagation()
            props.actionClick(1, memberId)
          }}
        ></Ellipsis>
      )
    if (props.uid === groupCreateMemberId)
      return (
        <Ellipsis
          onClick={(e) => {
            e.stopPropagation()
            props.actionClick(2, memberId)
          }}
        ></Ellipsis>
      )

    return <></>
  }

  return (
    <Cell className='cell' size='large' bordered>
      <View className='avatar'>{avatar ? <Avatar src={avatar} size='small'></Avatar> : <Avatar size='small'>M</Avatar>}</View>
      <View className='item'>
        <View>{name}</View>
        {getActionView()}
      </View>
    </Cell>
  )
}

export default UserBody
