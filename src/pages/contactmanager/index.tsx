/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-16 10:42:44
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Cell } from '@taroify/core'
import { Arrow, FriendsOutlined } from '@taroify/icons'
import { UserList } from './ui'

interface ICommonProps {
  accessToken: string
}

interface IDvaStateProps {
  common: ICommonProps
}

const Index: FunctionComponent = () => {
  const accessToken = useSelector<IDvaStateProps>((state) => state.common.accessToken)

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
