/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-19 15:50:53
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-04 17:32:31
 */
import { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CommonMain from '@/components/mixin'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { ActionSheet, Cell, Empty } from '@taroify/core'
import { AddOutlined, Search } from '@taroify/icons'
import { IGroup } from '~/../@types/group'
import { useToast } from '@/utils/taro'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import { ActionSheetActionObject } from '@taroify/core/action-sheet/action-sheet.shared'
import { groupList } from '@/api/group'
import { GroupList } from './ui'

import './index.scss'

const Index: FunctionComponent = () => {
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const [groups, setGroups] = useState<IGroup[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const idRef = useRef<string>('')
  const [toast] = useToast()

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

  const groupClickHandler = (id: string) => {
    setOpen(true)
    idRef.current = id
  }

  const selectedHandler = (event: ActionSheetActionObject) => {
    const group: IGroup | undefined = groups.find((x) => x.id === idRef.current)
    if (!group) {
      setOpen(false)
      return
    }
    if (group.createMemberId !== userInfo.id) {
      toast({ title: '权限不允许' })
      return
    }
    setOpen(false)
    switch (event.value) {
      case '1':
        _editGroup(group)
        break
      default:
    }
  }

  const _editGroup = async (group: IGroup) => {
    try {
      const result = await Router.toGroupcreate({
        data: group,
        params: {
          id: group.id
        }
      })
      if (!result) return
      const { edit } = result
      if (edit) {
        list()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const _deleteGroup = () => {}

  return (
    <Fragment>
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
              <GroupList groups={groups} groupClick={groupClickHandler}></GroupList>
            )}
          </Cell.Group>
        </View>
      </CommonMain>
      <View>
        <ActionSheet open={open} onSelect={selectedHandler} onClose={setOpen}>
          <ActionSheet.Action value='1' name='编辑' />
          <ActionSheet.Action value='2' name='删除' />
        </ActionSheet>
      </View>
    </Fragment>
  )
}

export default Index
