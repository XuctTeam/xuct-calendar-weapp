/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-19 15:50:53
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-06 20:53:12
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CommonMain from '@/components/mixin'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { ActionSheet, Empty } from '@taroify/core'

import { IGroup } from '~/../@types/group'
import { useModal, useToast } from 'taro-hooks'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import { ActionSheetActionObject } from '@taroify/core/action-sheet/action-sheet.shared'
import { groupList, deleteGroup } from '@/api/group'
import { GroupList, GroupHeader } from './ui'

import './index.scss'

const Index: FunctionComponent = () => {
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const [groups, setGroups] = useState<IGroup[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const idRef = useRef('')
  const [toast] = useToast()
  const [show] = useModal({
    title: '提示',
    content: '确定删除吗？'
  })

  useEffect(() => {
    list()
  }, [])

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
      setOpen(false)
      toast({ title: '权限不允许', icon: 'error' })
      return
    }
    setOpen(false)
    switch (event.value) {
      case '1':
        _editGroup(group)
        break
      default:
        _deleteGroup(group)
        break
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

  const _deleteGroup = useCallback(
    (group: IGroup) => {
      show().then((res) => {
        if (res.cancel) return
        deleteGroup(group.id || '')
          .then(() => {
            list()
            Router.setBackResult({ edit: true })
          })
          .catch((error) => {
            console.log(error)
          })
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [show]
  )

  const groupViewHandler = async (id: string) => {
    const group: IGroup | undefined = groups.find((x) => x.id === id)
    if (group === null) return
    try {
      const result = await Router.toGroupmembermanager({
        data: {
          group: group
        },
        params: {
          id: id
        }
      })
      if (!result) return
      const { edit } = result
      if (edit) {
        list()
        Router.setBackResult({ edit: true })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Fragment>
      <CommonMain className='vi-group-manager-wrapper' title='我的群组' fixed to={2} left>
        <View className='vi-group-manager-wrapper_container'>
          <GroupHeader list={list}></GroupHeader>
          <View className='list'>
            {groups.length === 0 ? (
              <Empty>
                <Empty.Image src='error' />
                <Empty.Description>暂无数据</Empty.Description>
              </Empty>
            ) : (
              <GroupList groups={groups} groupClick={groupClickHandler} groupView={groupViewHandler}></GroupList>
            )}
          </View>
        </View>
      </CommonMain>
      <View>
        <ActionSheet open={open} onSelect={selectedHandler} onClose={setOpen} rounded={false}>
          <ActionSheet.Header>操作</ActionSheet.Header>
          <ActionSheet.Action value='1' name='编辑' />
          <ActionSheet.Action value='2' name='删除' />
        </ActionSheet>
      </View>
    </Fragment>
  )
}

export default Index
