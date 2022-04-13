/*
 * @Author: Derek Xu
 * @Date: 2022-04-13 17:12:20
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-13 17:54:11
 * @FilePath: \xuct-calendar-weapp\src\pages\memberbindwechat\index.tsx
 * @Description: 绑定微信
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent, useEffect, useState } from 'react'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { Cell, Avatar } from '@taroify/core'
import { IUserAuth } from '~/../@types/dva'
import { getWechatAuth } from '@/api/user'

import './index.scss'

const MemberBindWechat: FunctionComponent = () => {
  const [avatar, setAvatar] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    _getData()
  })

  const _getData = () => {
    const data = Router.getData()
    if (!data) {
      getWechatAuth()
        .then((res) => {
          const auth = res as any as IUserAuth
          setAvatar(auth.avatar)
          setUsername(auth.nickName)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <CommonMain className='vi-member-bind-wechat-warpper' title='微信绑定' to={4} fixed={false} left>
      <Cell title='头像'>
        <Avatar src={avatar} size='mini' />
      </Cell>
      <Cell title='昵称'>{username}</Cell>
    </CommonMain>
  )
}

export default MemberBindWechat
