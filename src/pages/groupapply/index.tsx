/* eslint-disable react-hooks/rules-of-hooks */
/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-28 21:49:32
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import { Collapse } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { IGroup } from '~/../@types/group'
import { applyMineList, mineApplyList, applyAgreeJoinGroup, applyRefuseJoinGroup } from '@/api/group'
import { useToast } from '@/utils/taro'
import { ApplyMine, MineApply } from './ui'

import './index.scss'

const GroupApply: FunctionComponent = () => {
  const [value, setValue] = useState(0)
  const [applyMineGroups, setApplyMineGroups] = useState<IGroup[]>([])
  const [mineApplyGroups, setMineApplyGroups] = useState<IGroup[]>([])

  useEffect(() => {
    _listApplyMine()
    _listMineApply()
  }, [])

  const _listApplyMine = () => {
    applyMineList()
      .then((res) => {
        setApplyMineGroups(res as any as Array<IGroup>)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _listMineApply = () => {
    mineApplyList()
      .then((res) => {
        setMineApplyGroups(res as any as Array<IGroup>)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const applyAgree = (gid: string, mid: string) => {
    applyAgreeJoinGroup(gid, mid)
      .then(() => {
        useToast({ title: '操作成功', icon: 'success' })
        setApplyMineGroups([])
        _listApplyMine()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const applyRefuse = (gid: string, mid: string) => {
    applyRefuseJoinGroup(gid, mid)
      .then(() => {
        useToast({ title: '操作成功', icon: 'success' })
        setApplyMineGroups([])
        _listApplyMine()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonMain className='vi-group-apply-warpper' title='群组申请' fixed to={2} left>
      <Collapse accordion value={value} onChange={setValue}>
        <Collapse.Item title='我的申请'>
          <MineApply groups={mineApplyGroups}></MineApply>
        </Collapse.Item>
        <Collapse.Item title='申请我的'>
          <ApplyMine groups={applyMineGroups} applyAgree={applyAgree} applyRefuse={applyRefuse}></ApplyMine>
        </Collapse.Item>
      </Collapse>
    </CommonMain>
  )
}

export default GroupApply
