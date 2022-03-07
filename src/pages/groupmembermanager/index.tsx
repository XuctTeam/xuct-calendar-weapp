/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-07 11:47:25
 * @LastEditTime: 2022-03-07 17:57:18
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CommonMain from '@/components/mixin'
import Router from 'tarojs-router-next'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import { IGroupMember } from '~/../@types/group'
import { groupMemberList } from '@/api/group'
import { ActionSheet } from '@taroify/core'
import { UserBody } from './ui'

import './index.scss'

const GroupMemberManager: FunctionComponent = () => {
  const [gid, setGid] = useState<string>('')
  const [mid, setMid] = useState<string>('')
  const [members, setMembers] = useState<IGroupMember[]>([])
  const [out, setOut] = useState<boolean>(false)
  const [leave, setLeave] = useState<boolean>(false)
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)

  useEffect(() => {
    const data = Router.getData()
    if (!data) {
      const { id } = Router.getParams()
      if (!id) return
      _list(id)
      return
    }
    const { group } = data
    _list(group.id)
  }, [])

  const _list = (id: string) => {
    setGid(id)
    groupMemberList(id)
      .then((res) => {
        setMembers(res as any as Array<IGroupMember>)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const actionClickHandler = (ty: number, memberId: string) => {
    if (ty === 1) {
      setLeave(true)
      return
    }
    setOut(true)
  }

  return (
    <Fragment>
      <CommonMain className='vi-group-member-manager-warpper' title='群组管理' left fixed to={2}>
        {members.map((item, index) => {
          return (
            <Fragment key={index}>
              <UserBody uid={userInfo.id} member={item} actionClick={actionClickHandler}></UserBody>
            </Fragment>
          )
        })}
      </CommonMain>
      <ActionSheet open={leave} onSelect={() => setLeave(false)} onCancel={() => setLeave(false)} onClose={setLeave} rounded={false}>
        <ActionSheet.Action value='1' name='退出' />
      </ActionSheet>
      <ActionSheet open={out} onSelect={() => setOut(false)} onCancel={() => setOut(false)} onClose={setOut} rounded={false}>
        <ActionSheet.Action value='1' name='请出' />
        <ActionSheet.Button type='cancel'>取消</ActionSheet.Button>
      </ActionSheet>
    </Fragment>
  )
}
export default GroupMemberManager
