/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-03-17 13:14:20
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Cell } from '@taroify/core'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { throttle } from 'lodash'
import CommonMain from '@/components/mixin'
import { Arrow, FriendsOutlined, UserOutlined } from '@taroify/icons'
import { useWebEnv } from '@/utils/taro'
import { groupMemberPinYinList } from '@/api/groupmember'
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

  const mineGroupClickHandle = throttle(
    async () => {
      try {
        const result = await Router.toGroupmanager()
        if (!result) return
        const { edit } = result
        if (edit) {
          refresh()
        }
      } catch (err) {
        console.log(err)
      }
    },
    800,
    {
      trailing: false
    }
  )

  const refresh = () => {
    setLoading(true)
    groupMemberPinYinList()
      .then((res) => {
        setLoading(false)
        setPinYinList(res as any as Array<IPinYinGroupMember>)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const applyHandler = throttle(
    () => {
      Router.toGroupapply()
    },
    800,
    { trailing: false }
  )

  return (
    <CommonMain className='vi-group-manager-warpper' fixed left={false} title='通讯录管理'>
      <Fragment>
        <View className='vi-group-manager-warpper_header'></View>
        <Cell icon={<UserOutlined />} title='新的申请' rightIcon={<Arrow />} clickable onClick={() => applyHandler()}></Cell>
        <Cell icon={<FriendsOutlined />} title='我的群组' rightIcon={<Arrow />} clickable onClick={() => mineGroupClickHandle()}></Cell>
      </Fragment>
      <View className='vi-group-manager-warpper_list'>
        {useWebEnv() ? (
          <WebUserList loading={loading} refresh={refresh} disabled={!accessToken} pinYinMembers={pinYinList}></WebUserList>
        ) : (
          <WeappUserList loading={loading} refresh={refresh} disabled={!!accessToken} pinYinMembers={pinYinList}></WeappUserList>
        )}
      </View>
    </CommonMain>
  )
}

export default Index
