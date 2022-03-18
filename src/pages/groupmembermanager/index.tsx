/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-07 11:47:25
 * @LastEditTime: 2022-03-18 10:35:32
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CommonMain from '@/components/mixin'
import Router from 'tarojs-router-next'
import { ActionSheet } from '@taroify/core'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import { IGroupMember } from '~/../@types/group'
import { groupMemberList, groupMemberLeave } from '@/api/groupmember'
import { useBack } from '@/utils/taro'
import { UserBody } from './ui'

import './index.scss'

const Index: FunctionComponent = () => {
  const [members, setMembers] = useState<IGroupMember[]>([])
  const [out, setOut] = useState<boolean>(false)
  const [leave, setLeave] = useState<boolean>(false)
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const groupRef = useRef<string>('')
  const memberIdRef = useRef<string>('')
  const [back] = useBack()

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
    groupMemberList(id)
      .then((res) => {
        setMembers(res as any as Array<IGroupMember>)
      })
      .catch((err) => {
        console.log(err)
      })
    groupRef.current = id
  }

  const actionClickHandler = (ty: number, memberId: string) => {
    memberIdRef.current = memberId
    if (ty === 1) {
      setLeave(true)
      return
    }
    setOut(true)
  }

  /**
   * 主动离开
   */
  const memberLeaveHander = () => {
    setLeave(false)
    groupMemberLeave(groupRef.current, 3).then(() => {
      back({ to: 2, data: { edit: true } })
    })
  }

  /**
   * 被请出
   */
  const memberGoOutHandler = () => {
    setOut(false)
    console.log(memberIdRef.current)
    groupMemberLeave(groupRef.current, 4, memberIdRef.current).then(() => {
      _list(groupRef.current)
      Router.setBackResult({ edit: true })
    })
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
      <ActionSheet open={leave} onSelect={memberLeaveHander} onCancel={() => setLeave(false)} onClose={setLeave} rounded={false}>
        <ActionSheet.Action value='1' name='退出' />
        <ActionSheet.Button type='cancel'>取消</ActionSheet.Button>
      </ActionSheet>
      <ActionSheet open={out} onSelect={memberGoOutHandler} onCancel={() => setOut(false)} onClose={setOut} rounded={false}>
        <ActionSheet.Action value='1' name='请出' />
        <ActionSheet.Button type='cancel'>取消</ActionSheet.Button>
      </ActionSheet>
    </Fragment>
  )
}
export default Index
