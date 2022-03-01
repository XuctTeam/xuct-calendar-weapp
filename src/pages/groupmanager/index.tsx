/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-19 15:50:53
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-01 14:08:18
 */
import { FunctionComponent, useEffect, useState } from 'react'
import CommonMain from '@/components/mixin'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Cell, Empty } from '@taroify/core'
import { AddOutlined, Search, FriendsOutlined } from '@taroify/icons'
import { IGroup } from '~/../@types/group'
import { groupList } from '@/api/group'

import { GroupList } from './ui'

import './index.scss'

const Index: FunctionComponent = () => {
  const [groups, setGroups] = useState<IGroup[]>([])

  useEffect(() => {
    list()
  }, [])

  const addGroupHandler = async () => {
    try {
      await Router.toGroupcreate()
      list()
    } catch (err) {
      Router.toContactmanager()
    }
  }

  const searchGroupHandler = async () => {
    try {
      await Router.toGroupsearch()
    } catch (err) {
      Router.toContactmanager()
    }
  }

  const list = () => {
    groupList()
      .then((res) => {
        setGroups(res as any as Array<IGroup>)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonMain className='vi-group-manager-wrapper' title='我的群组' fixed to={2} left>
      <View className='vi-group-manager-wrapper_container'>
        <Cell icon={<AddOutlined />} title='添加群组' bordered clickable onClick={() => addGroupHandler()}></Cell>
        <Cell icon={<Search />} title='加入群组' bordered clickable onClick={() => searchGroupHandler()}></Cell>
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
    </CommonMain>
  )
}

export default Index
