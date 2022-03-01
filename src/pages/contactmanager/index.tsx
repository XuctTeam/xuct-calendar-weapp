/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-03-01 15:42:23
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Cell } from '@taroify/core'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Arrow, FriendsOutlined, UserOutlined } from '@taroify/icons'
import { useWebEnv } from '@/utils/taro'
import { groupMemberList } from '@/api/group'
import { IPinYinGroupMember } from '~/../@types/group'
import { IDvaCommonProps } from '~/../@types/dva'
import { WebUserList, WeappUserList } from './ui'

import './index.scss'

const Index: FunctionComponent = () => {
  const [loading, setLoading] = useState(false)
  const [pinYinList, setPinYinList] = useState<IPinYinGroupMember[]>([])
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)

  useEffect(() => {
    if (!accessToken) {
      setPinYinList([])
      return
    }
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  const mineGroupClickHandle = () => {
    Router.toGroupmanager()
  }

  const refresh = () => {
    setLoading(true)
    groupMemberList()
      .then((res) => {
        setLoading(false)
        setPinYinList(res as any as Array<IPinYinGroupMember>)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const applyHandler = () => {
    Router.toGroupapply()
  }

  return (
    <View className='vi-group-manager-warpper'>
      <Cell.Group title='群组'>
        <View className='vi-group-manager-warpper_header'></View>
        <Cell icon={<UserOutlined />} title='新的申请' rightIcon={<Arrow />} clickable onClick={() => applyHandler()}></Cell>
        <Cell icon={<FriendsOutlined />} title='我的群组' rightIcon={<Arrow />} clickable onClick={() => mineGroupClickHandle()}></Cell>
      </Cell.Group>
      <View className='vi-group-manager-warpper_list'>
        {useWebEnv() ? (
          <WebUserList loading={loading} refresh={refresh} disabled={!accessToken} pinYinMembers={pinYinList}></WebUserList>
        ) : (
          <WeappUserList loading={loading} refresh={refresh} disabled={!!accessToken} pinYinMembers={pinYinList}></WeappUserList>
        )}
      </View>
    </View>
  )
}

export default Index
