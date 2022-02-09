/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-09 19:42:26
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Cell } from '@taroify/core'
import { Arrow, FriendsOutlined } from '@taroify/icons'
import { UserList } from './ui'

const Index: FunctionComponent = () => {
  return (
    <View>
      <Cell.Group title='群组'>
        <Cell icon={<FriendsOutlined />} title='我的群组' rightIcon={<Arrow />} clickable onClick={() => Router.toGroupmanager()}></Cell>
      </Cell.Group>
      <Cell.Group title='联系人'>
        <UserList></UserList>
      </Cell.Group>
    </View>
  )
}

export default Index
