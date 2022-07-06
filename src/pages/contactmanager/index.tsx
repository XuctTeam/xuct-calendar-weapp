/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-07-06 21:50:48
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { throttle } from 'lodash/function'
import CommonMain from '@/components/mixin'
import { useWebEnv } from '@/utils/taro'
import { groupMemberPinYinList } from '@/api/groupmember'
import { IPinYinGroupMember } from '~/../@types/group'
import { IDvaCommonProps } from '~/../@types/dva'
import { WebUserList, WeappUserList, GroupHeader } from './ui'

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
    query()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  const query = () => {
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

  const mineGroupClickHandle = throttle(
    async () => {
      try {
        const result = await Router.toGroupmanager()
        if (!result) return
        const { edit } = result
        if (edit) {
          query()
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

  const applyHandle = throttle(
    async () => {
      try {
        const { refresh } = await Router.toGroupapply()
        if (!refresh) return
        query()
      } catch (err) {
        console.log(err)
      }
    },
    800,
    { trailing: false }
  )

  return (
    <CommonMain className='vi-group-manager-warpper' fixed left={false} title='通讯录管理'>
      <GroupHeader apply={applyHandle} mineClick={mineGroupClickHandle}></GroupHeader>
      <View className='br'></View>
      <View className='vi-group-manager-warpper_list'>
        {useWebEnv() ? (
          <WebUserList loading={loading} refresh={query} disabled={!accessToken} pinYinMembers={pinYinList}></WebUserList>
        ) : (
          <WeappUserList loading={loading} refresh={query} disabled={!!accessToken} pinYinMembers={pinYinList}></WeappUserList>
        )}
      </View>
    </CommonMain>
  )
}

export default Index
