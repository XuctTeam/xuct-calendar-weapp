/*
 * @Author: Derek Xu
 * @Date: 2022-07-07 08:40:08
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-07 13:43:57
 * @FilePath: \xuct-calendar-weapp\src\pages\groupdetail\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { Avatar, Button, Cell, Dialog, Field, Input } from '@taroify/core'
import { getGroupInfo } from '@/api/group'
import { apply } from '@/api/groupmember'
import { useToast } from 'taro-hooks'
import { useBack } from '@/utils/taro'
import { IGroup } from '~/../@types/group'
import './index.scss'

const defaultGroup = {
  name: '',
  num: 1,
  createMemberId: '',
  power: '',
  hasPasswordJoin: 0
}
const GroupDetail: FC = () => {
  const [password, setPassword] = useState<string>('')
  const [gid, setGid] = useState<string>('')
  const [hasPassword, setHasPassword] = useState<string>('0')
  const [open, setOpen] = useState<boolean>(false)
  const [group, setGroup] = useState<IGroup>(defaultGroup)

  const [show] = useToast()
  const [back] = useBack({
    to: 2
  })

  useEffect(() => {
    const params = Router.getParams()
    if (!params) return
    const { id, hasPasswordJoin } = params
    console.log(id, hasPasswordJoin)
    if (!id) return
    setGid(id)
    if (!hasPasswordJoin) return
    setHasPassword(hasPasswordJoin)

    getGroupInfo(id).then((res) => {
      setGroup(res as any as IGroup)
    })
  }, [])

  const toJoin = () => {
    apply(gid, password)
      .then(() => {
        showSuccessToast()
      })
      .catch((err) => {
        console.log(err)
        setOpen(false)
      })
  }

  const showSuccessToast = useCallback(() => {
    show({
      title: '加入成功',
      icon: 'success',
      duration: 5000
    })
      .then(() => {
        back()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [show])

  const showErrorToast = useCallback(() => {
    show({
      title: '密码不能为空',
      icon: 'error'
    })
  }, [show])

  return (
    <Fragment>
      <CommonMain className='group-detail-warpper' title='群组详情' fixed left to={2}>
        <View className='box'>
          <View className='detail shadow'>
            <View className='avatar'>{group.images ? <Avatar src={group.images} size='large' /> : <Avatar style={{ background: 'pink' }}>G</Avatar>}</View>
            <Cell title='群组名称'>{group.name}</Cell>
            <Cell title='群组编号'>{group.no}</Cell>
            <Cell title='创建者'>{group.createMemberName}</Cell>
            <Cell title='最大人数'>{group.num}</Cell>
            <Cell title='是否密码加入'>{group.hasPasswordJoin ? '是' : '否'}</Cell>
            <Cell title='已有组员'>{group.count}</Cell>
          </View>
          {hasPassword && hasPassword === '1' && (
            <View className='join shadow'>
              <Field label='密码' required className='field'>
                <Input placeholder='请输入密码' value={password} maxlength={8} onChange={(e) => setPassword(e.detail.value)} />
              </Field>
            </View>
          )}
        </View>
        <View className='button'>
          <Button
            color='danger'
            block
            onClick={() => {
              if (hasPassword === '1' && !password) {
                showErrorToast()
                return
              }
              setOpen(true)
            }}
          >
            加入
          </Button>
        </View>
      </CommonMain>
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Header>确认</Dialog.Header>
        <Dialog.Content>是否加入？</Dialog.Content>
        <Dialog.Actions>
          <Button
            onClick={() => {
              setOpen(false)
            }}
          >
            取消
          </Button>
          <Button onClick={toJoin}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </Fragment>
  )
}

export default GroupDetail
