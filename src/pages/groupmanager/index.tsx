/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-19 15:50:53
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-13 19:39:21
 */
import { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CommonMain from '@/components/mixin'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Dialog, Empty, Button, Divider, ShareSheet } from '@taroify/core'
import { IGroup } from '~/../@types/group'
import { useToast } from 'taro-hooks'
import { useEnv } from 'taro-hooks'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import { groupList, deleteGroup } from '@/api/group'
import { Plus } from '@taroify/icons'

import { WebGroupList, GroupAction, WxGroupList } from './ui'

import './index.scss'

const Index: FunctionComponent = () => {
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const [groups, setGroups] = useState<IGroup[]>([])
  const [loading, setLoading] = useState(false)
  const [actionOpen, setActionOpen] = useState<boolean>(false)
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

  const edit = (id: string) => {
    if (!id) return
    const group: IGroup | undefined = groups.find((x) => x.id === id)
    if (group) _editGroup(group)
  }

  const remove = (id: string) => {
    Dialog.confirm({
      title: '确认',
      message: '确定删除吗？',
      onConfirm: () => {
        deleteGroup(id)
          .then(() => {
            showDeleteToast()
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
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

  const viewGroup = async (id: string) => {
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
            <WxGroupList loading={loading} refresh={refresh} groups={groups} uid={userInfo.id} edit={edit} remove={remove} viewGroup={viewGroup}></WxGroupList>
          ) : (
            <WebGroupList loading={loading} groups={groups} uid={userInfo.id} edit={edit} remove={remove} viewGroup={viewGroup}></WebGroupList>
          )}
        </View>
      </CommonMain>
      <Dialog id='dialog' />
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
