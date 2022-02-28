/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-28 17:31:40
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent } from 'react'
import { Cell } from '@taroify/core'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Arrow, FriendsOutlined } from '@taroify/icons'
import { WebUserList, WeappUserList } from './ui'
import './index.scss'

const Index: FunctionComponent = () => {
  const mineGroupClickHandle = () => {
    Router.toGroupmanager()
  }

  return (
    <View className='vi-group-manager-warpper'>
      <Cell.Group title='群组'>
        <Cell
          icon={<FriendsOutlined />}
          title='我的群组'
          rightIcon={<Arrow />}
          className='vi-group-manager-warpper_header'
          clickable
          onClick={() => mineGroupClickHandle()}
        ></Cell>
      </Cell.Group>
      <View className='vi-group-manager-warpper_list'>{process.env.TARO_ENV === 'h5' ? <WebUserList></WebUserList> : <WeappUserList></WeappUserList>}</View>
      {/* <WebUserList></WebUserList> */}
    </View>
  )
}

export default Index
