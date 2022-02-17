/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-17 13:37:17
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { Cell } from '@taroify/core'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Arrow, FriendsOutlined } from '@taroify/icons'
import { IDvaCommonProps } from '~/../@types/dva'
import { UserList } from './ui'

const Index: FunctionComponent = () => {
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)

  const mineGroupClickHandle = () => {
    if (!accessToken) {
      return Router.toLogin()
    }
    Router.toGroupmanager()
  }

  return (
    <View>
      <Cell.Group title='群组'>
        <Cell icon={<FriendsOutlined />} title='我的群组' rightIcon={<Arrow />} clickable onClick={() => mineGroupClickHandle()}></Cell>
      </Cell.Group>
      <Cell.Group title='联系人'>
        <UserList></UserList>
      </Cell.Group>
    </View>
  )
}

export default Index
