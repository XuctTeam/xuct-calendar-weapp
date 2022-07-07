/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-19 15:50:53
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-07 18:14:08
 */
import { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CommonMain from '@/components/mixin'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { ActionSheet, Dialog, Empty, Button, Divider, ShareSheet } from '@taroify/core'
import { IGroup } from '~/../@types/group'
import { useToast } from 'taro-hooks'
import { useEnv } from 'taro-hooks'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import { ActionSheetActionObject } from '@taroify/core/action-sheet/action-sheet.shared'
import { groupList, deleteGroup } from '@/api/group'
import { Plus } from '@taroify/icons'

import { WebGroupList, GroupAction, WxGroupList } from './ui'

import './index.scss'

const Index: FunctionComponent = () => {
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const [groups, setGroups] = useState<IGroup[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [actionOpen, setActionOpen] = useState<boolean>(false)
  const idRef = useRef<string>('')
  const env = useEnv()

  const [toast] = useToast()

  useEffect(() => {
    list()
  }, [])

  const list = () => {
    setLoading(true)
    groupList()
      .then((res) => {
        setGroups(res as any as Array<IGroup>)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const groupClickHandler = (id: string) => {
    idRef.current = id
    setOpen(true)
  }

  const selectedHandler = (event: ActionSheetActionObject) => {
    if (!idRef.current) return
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
      case 1:
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

  const _deleteGroup = (group: IGroup) => {
    Dialog.confirm({
      title: '确认',
      message: '确定删除吗？',
      onConfirm: () => {
        deleteGroup(group.id || '')
          .then(() => {
            showDeleteToast()
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  }

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

  const refresh = () => {
    setGroups([])
    list()
  }

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

  const actionSelected = (data: ShareSheet.OptionObject) => {
    if (data.value === 1) {
      addGroupHandler()
    } else if (data.value == 2) {
      searchGroupHandler()
    }
    setActionOpen(false)
  }

  const showDeleteToast = () => {
    toast({
      title: '删除成功'
    }).then(() => {
      idRef.current = ''
      list()
      Router.setBackResult({ edit: true })
    })
  }

  return (
    <Fragment>
      <CommonMain className='vi-group-manager-wrapper' title='我的群组' fixed to={2} left>
        <View className='action'>
          <Button block variant='text' color='info' size='small' icon={<Plus />} onClick={() => setActionOpen(true)}>
            群组管理
          </Button>
        </View>
        <Divider dashed>华丽的分割线</Divider>

        <View className='list'>
          {groups.length === 0 ? (
            <Empty>
              <Empty.Image />
              <Empty.Description>暂无数据</Empty.Description>
            </Empty>
          ) : env === 'WEAPP' ? (
            <WxGroupList
              loading={loading}
              refresh={refresh}
              groups={groups}
              uid={userInfo.id}
              groupClick={groupClickHandler}
              groupView={groupViewHandler}
            ></WxGroupList>
          ) : (
            <WebGroupList
              loading={loading}
              refresh={refresh}
              groups={groups}
              uid={userInfo.id}
              groupClick={groupClickHandler}
              groupView={groupViewHandler}
            ></WebGroupList>
          )}
        </View>
      </CommonMain>
      <Dialog id='dialog' />
      <ActionSheet open={open} onSelect={selectedHandler} onClose={setOpen} rounded={false}>
        <ActionSheet.Header>操作</ActionSheet.Header>
        <ActionSheet.Action value={1} name='编辑' />
        <ActionSheet.Action value={2} name='删除' />
      </ActionSheet>
      <GroupAction
        open={actionOpen}
        actionSelected={actionSelected}
        close={() => {
          setActionOpen(false)
        }}
      ></GroupAction>
    </Fragment>
  )
}

export default Index
