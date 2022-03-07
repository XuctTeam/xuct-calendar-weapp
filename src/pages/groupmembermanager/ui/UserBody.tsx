/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-01 14:48:18
 * @LastEditTime: 2022-03-07 17:56:33
 * @LastEditors: Derek Xu
 */
import React, { Fragment, FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { IGroupMember } from '~/../@types/group'
import { Ellipsis } from '@taroify/icons'
import { Avatar, Cell } from '@taroify/core'
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
    if (groupOwner) return <Fragment>管理员</Fragment>
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
    <Cell className='cell' size='large'>
      <View className='avatar'>{avatar ? <Avatar src={avatar}></Avatar> : <Avatar>M</Avatar>}</View>
      <View className='item'>
        <View>{name}</View>
        <Fragment>{getActionView()}</Fragment>
      </View>
    </Cell>
  )
}

export default UserBody
