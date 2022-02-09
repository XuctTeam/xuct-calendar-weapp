/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-19 15:50:53
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-09 21:47:15
 */
import { FunctionComponent, useEffect, useState } from 'react'
import CommonHeader from '@/components/mixin'
import { View } from '@tarojs/components'
import { Cell, Empty } from '@taroify/core'
import { AddOutlined } from '@taroify/icons'
import { GroupList } from './ui'
import { IGroup } from '~/../@types/group'
import { groupList } from '@/api/group'

import './index.scss'
import Router from 'tarojs-router-next'

const Index: FunctionComponent = () => {
  const [groups, setGroups] = useState<IGroup[]>([])

  useEffect(() => {
    groupList()
      .then((res) => {
        setGroups(res as any as Array<IGroup>)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const addGroupHandler = () => {
    try {
      Router.toGroupcreate()
    } catch (err) {
      Router.toContactmanager()
    }
  }

  return (
    <View className='vi-group-manager-wrapper'>
      <CommonHeader title='我的群组' fixed to={4} left></CommonHeader>
      <View className='vi-group-manager-wrapper_container' style={{ marginTop: process.env.TARO_ENV === 'h5' ? '50px' : '0px' }}>
        <Cell icon={<AddOutlined />} title='添加群组' bordered clickable onClick={() => addGroupHandler()}></Cell>
        <Cell.Group title='我的群组'>
          {groups.length === 0 ? (
            <Empty>
              <Empty.Image src='error' />
              <Empty.Description>暂无数据</Empty.Description>
            </Empty>
          ) : (
            <GroupList groups={groups}></GroupList>
          )}
        </Cell.Group>
      </View>
    </View>
  )
}

export default Index
