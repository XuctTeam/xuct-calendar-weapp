/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-28 21:35:44
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useState } from 'react'
import { Cell } from '@taroify/core'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Arrow, FriendsOutlined } from '@taroify/icons'
import { WebUserList, WeappUserList } from './ui'
import { useWebEnv } from '@/utils/taro'
import './index.scss'

const Index: FunctionComponent = () => {
  const [loading, setLoading] = useState(false)

  const mineGroupClickHandle = () => {
    Router.toGroupmanager()
  }

  const refresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    })
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
      <View className='vi-group-manager-warpper_list'>
        {useWebEnv() ? <WebUserList loading={loading} refresh={refresh}></WebUserList> : <WeappUserList></WeappUserList>}
      </View>
    </View>
  )
}

export default Index
