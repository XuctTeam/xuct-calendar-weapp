/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-07-06 21:49:14
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { Dialog, Tabs } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { IGroupMember } from '~/../@types/group'
import { applyMineList, mineApplyList, applyAgreeJoinGroup, applyRefuseJoinGroup } from '@/api/groupmember'
import { toast } from '@/utils/taro'
import { ApplyMine, MineApply } from './ui'

import './index.scss'

const GroupApply: FunctionComponent = () => {
  const [applyMineGroups, setApplyMineGroups] = useState<IGroupMember[]>([])
  const [mineApplyGroups, setMineApplyGroups] = useState<IGroupMember[]>([])
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    _listApplyMine()
    _listMineApply()
  }, [])

  const _listApplyMine = () => {
    applyMineList()
      .then((res) => {
        setApplyMineGroups(res as any as Array<IGroupMember>)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _listMineApply = () => {
    mineApplyList()
      .then((res) => {
        setMineApplyGroups(res as any as Array<IGroupMember>)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const applyAgree = (id: string) => {
    applyAgreeJoinGroup(id, 1)
      .then(() => {
        setRefresh(true)
        toast({ title: '操作成功', icon: 'success' })
        setApplyMineGroups(
          applyMineGroups.filter((item) => {
            return item.id !== id
          })
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const applyRefuse = (id: string) => {
    applyRefuseJoinGroup(id, 2)
      .then(() => {
        toast({ title: '操作成功', icon: 'success' })
        setApplyMineGroups(
          applyMineGroups.filter((item) => {
            return item.id !== id
          })
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const reject = (id: string) => {
    Dialog.confirm({
      title: '确认',
      message: '确认拒绝吗？',
      onConfirm: () => {
        applyRefuse(id)
      }
    })
  }

  const agree = (id: string) => {
    Dialog.confirm({
      title: '确认',
      message: '确认同意吗？',
      onConfirm: () => {
        applyAgree(id)
      }
    })
  }

  return (
    <Fragment>
      <CommonMain className='vi-group-apply-warpper' title='群组申请' fixed to={2} left data={{ refresh }}>
        <Tabs animated>
          <Tabs.TabPane title='我的申请'>
            <MineApply groups={mineApplyGroups} reject={reject} agree={agree}></MineApply>
          </Tabs.TabPane>
          <Tabs.TabPane title='申请我的'>
            <ApplyMine groups={applyMineGroups} reject={reject} agree={agree}></ApplyMine>
          </Tabs.TabPane>
        </Tabs>
      </CommonMain>
      <Dialog id='dialog' />
    </Fragment>
  )
}

export default GroupApply
