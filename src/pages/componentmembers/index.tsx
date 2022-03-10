/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-03-09 20:48:43
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-10 13:59:21
 */
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { Button, Cell, Checkbox } from '@taroify/core'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import { useBack } from '@/utils/taro'
import { ICheckGroupMember } from '~/../@types/group'
import { distinctMemberList } from '@/api/groupmember'
import { UserBody } from './ui'

import './index.scss'

const ComponentMembers: FunctionComponent = () => {
  const [members, setMembers] = useState<ICheckGroupMember[]>([])
  const [allCheck, setAllCheck] = useState<boolean>(false)
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const [back] = useBack()

  useEffect(() => {
    const data = Router.getData()
    let paramIds: string[] = []
    if (data) {
      const { memberIds } = data
      paramIds = memberIds as any as Array<string>
    }
    distinctMemberList().then((res) => {
      const list = res as any as Array<ICheckGroupMember>
      if (paramIds.length !== 0) {
        list.forEach((x) => {
          if (paramIds.includes(x.memberId)) {
            x.checked = true
          }
        })
      }
      setMembers(list)
      if (paramIds.length === list.length && list.length !== 0) {
        setAllCheck(true)
      }
    })
  }, [])

  const allCheckChange = (val: boolean) => {
    setAllCheck(val)
    const list: Array<ICheckGroupMember> = [...members]
    list.forEach((x) => (x.checked = val))
    setMembers(list)
  }

  const groupCheckChage = (val: string[]) => {
    const list: Array<ICheckGroupMember> = [...members]
    list.forEach((x) => {
      if (val.includes(x.memberId)) {
        x.checked = true
      } else {
        x.checked = false
      }
    })
    setMembers(list)
    if (val.length === list.length) {
      setAllCheck(true)
    } else {
      setAllCheck(false)
    }
  }

  const selectBackHandler = () => {
    const ids = members.filter((x) => x.checked).map((item) => item.memberId)
    back({
      to: 1,
      data: {
        memberIds: ids
      }
    })
  }

  return (
    <CommonMain title='参与者' left to={1} fixed className='vi-component-members-warpper'>
      <Cell className='all-check' size='large'>
        <Checkbox checked={allCheck} onChange={allCheckChange}>
          全选
        </Checkbox>
      </Cell>
      <View className='vi-component-members-warpper_self'>
        <UserBody
          member={{
            name: userInfo.name,
            avatar: userInfo.avatar || '',
            memberId: userInfo.id,
            checked: true
          }}
        ></UserBody>
      </View>

      <Checkbox.Group className='vi-component-members-warpper_list' onChange={groupCheckChage}>
        <Cell.Group>
          {members.map((item, index) => {
            return (
              <Fragment key={index}>
                <UserBody member={item}></UserBody>
              </Fragment>
            )
          })}
        </Cell.Group>
      </Checkbox.Group>
      <View className='vi-component-members-warpper_button'>
        <Button color='success' block onClick={selectBackHandler}>
          保存
        </Button>
      </View>
    </CommonMain>
  )
}

export default ComponentMembers
